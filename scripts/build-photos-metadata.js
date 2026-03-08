/**
 * build-photos-metadata.js
 * 
 * Script de génération des métadonnées de photos
 * Exécuté localement ou via GitHub Actions
 * 
 * Flux :
 * 1. Cherche photos dans photos_input/
 * 2. Upload sur Cloudinary
 * 3. Génère tags via Google Vision API
 * 4. Crée/met à jour src/data/photos.json
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// CRITICAL: Polyfill for SlowBuffer which is removed in Node 25+
// This MUST run before any other modules are imported because legacy 
// dependencies (like 'jwa' used by Google/Cloudinary) require it.
const buffer = require('buffer');
if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
  // Also set globally just in case
}

const fs = await import('fs');
const path = await import('path');
const { default: sharp } = await import('sharp');
const { default: dotenv } = await import('dotenv');
const { default: cloudinary } = await import('cloudinary');

dotenv.config();

// ============================================
// CONFIGURATION CLOUDINARY
// ============================================

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PHOTOS_INPUT_DIR = path.resolve('./photos_input');
const PHOTOS_DATA_FILE = path.resolve('./src/data/photos.json');
const THUMBNAILS_DIR = path.resolve('./public/thumbnails');
const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = /\.(jpg|jpeg|png|webp)$/i;
const FORCE_UPLOAD = process.argv.includes('--force');

// ============================================
// CONFIGURATION TAGS
// ============================================

const TAG_BLACKLIST = new Set([
  'arabe', 'arab', 'arabic', 'middle east', 'oriental',
  'toilet seat', 'jinrikisha', 'rickshaw', 'screenshot', 'text', 'line'
]);

// ============================================
// UTILITAIRES
// ============================================

function normalizeKeyword(keyword) {
  if (!keyword) return '';
  
  // Normalisation : miniscule, suppression des accents, suppression caractères spéciaux
  let normalized = keyword
    .trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Enlève les accents (é -> e)
    .replace(/[^\w\s\-]/g, '') // Ne garde que lettres, chiffres, espaces et tirets
    .replace(/\s+/g, ' '); // Un seul espace max
  
  if (TAG_BLACKLIST.has(normalized)) {
    return '';
  }

  return normalized;
}

function deduplicateKeywords(keywords) {
  const seen = new Set();
  const results = [];
  for (const kw of keywords) {
    const normalized = normalizeKeyword(kw);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      results.push(kw.trim());
    }
  }
  return results;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function compressImage(inputPath, maxSize = MAX_PHOTO_SIZE) {
  let quality = 95;
  let buffer = await sharp(inputPath)
    .withMetadata() // Conserver les EXIF et profil colorimétrique
    .rotate() // Auto-rotate based on EXIF before stripping it
    .jpeg({ quality })
    .toBuffer();

  while (buffer.length > maxSize && quality > 60) {
    quality -= 5;
    buffer = await sharp(inputPath)
      .withMetadata()
      .rotate()
      .jpeg({ quality })
      .toBuffer();
  }

  return buffer;
}

async function generateThumbnail(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate() // Correct orientation before metadata stripping
    .resize(400, 400, { fit: 'cover', position: 'center' })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

// ============================================
// CLOUDINARY UPLOAD
// ============================================

async function uploadToCloudinary(filePath, fileName) {
  try {
    console.log(`📤 Upload simple pour : ${fileName}...`);
    const result = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: 'image',
      folder: 'portfolio/photos',
      public_id: path.parse(fileName).name,
      use_filename: true,
      unique_filename: false,
      overwrite: true
      // On retire quality: 'auto' pour forcer Cloudinary à conserver la qualité d'origine (haute résolution)
    });

    return result.secure_url;
  } catch (error) {
    console.error(`❌ Erreur Cloudinary pour ${fileName}:`, error.message);
    throw error;
  }
}

async function uploadThumbnail(thumbnailPath, fileName) {
  try {
    const result = await cloudinary.v2.uploader.upload(thumbnailPath, {
      resource_type: 'image',
      folder: 'portfolio/thumbnails',
      public_id: path.parse(fileName).name,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      format: 'webp'
    });

    console.log(`✅ Thumbnail uploadé : ${fileName}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Erreur upload thumbnail pour ${fileName}:`, error.message);
    throw error;
  }
}

// ============================================
// GESTION MÉTADONNÉES
// ============================================

async function loadExistingPhotos() {
  try {
    if (!fs.existsSync(PHOTOS_DATA_FILE)) {
      return { version: '1.0.0', lastUpdated: new Date().toISOString(), photos: [] };
    }

    const content = fs.readFileSync(PHOTOS_DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('⚠️ Impossible de charger photos.json, création nouveau :', error.message);
    return { version: '1.0.0', lastUpdated: new Date().toISOString(), photos: [] };
  }
}

function savePhotosData(data) {
  data.lastUpdated = new Date().toISOString();
  data.totalPhotos = data.photos.length;

  fs.writeFileSync(
    PHOTOS_DATA_FILE,
    JSON.stringify(data, null, 2),
    'utf-8'
  );
  console.log(`✅ photos.json sauvegardé (${data.photos.length} photos)`);
}

function findPhotoById(photos, id) {
  return photos.find(p => p.id === id);
}

// ============================================
// TRAITEMENT PHOTOS
// ============================================

async function processPhotos() {
  console.log(`🚀 Début traitement des photos (Mode Manuel)${FORCE_UPLOAD ? ' [FORCE UPLOAD]' : ''}...\n`);

  // Vérifier input dir
  if (!fs.existsSync(PHOTOS_INPUT_DIR)) {
    console.log(`⚠️ Dossier ${PHOTOS_INPUT_DIR} introuvable. Création...`);
    fs.mkdirSync(PHOTOS_INPUT_DIR, { recursive: true });
    console.log('✅ Dossier créé. Ajoute tes photos et relance.');
    return;
  }

  // Lister et trier les photos par date de création/modification
  const files = fs.readdirSync(PHOTOS_INPUT_DIR)
    .filter(file => SUPPORTED_FORMATS.test(file))
    .map(file => {
      const fullPath = path.resolve(PHOTOS_INPUT_DIR, file);
      const stats = fs.statSync(fullPath);
      return {
        path: fullPath,
        name: file,
        time: stats.mtime.getTime() // Utilisation de la date de modification
      };
    })
    .sort((a, b) => a.time - b.time); // Tri chronologique

  if (files.length === 0) {
    console.log('⚠️ Aucune photo trouvée dans photos_input/');
    return;
  }

  console.log(`📸 ${files.length} photo(s) détectée(s) et triées par date`);

  // Créer dossier thumbnails
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  }

  // Charger métadonnées existantes
  const photosData = await loadExistingPhotos();
  let nextId = Math.max(0, ...photosData.photos.map(p => p.id || 0)) + 1;

  // Traiter chaque photo
  for (let i = 0; i < files.length; i++) {
    const fileTarget = files[i];
    const filePath = fileTarget.path;
    const originalFileName = fileTarget.name;
    
    // Nouveau nom séquentiel (photo-001, photo-002, etc.)
    const sequentialId = String(i + 1).padStart(3, '0');
    const newFileNameNoExt = `photo-${sequentialId}`;

    try {
      console.log(`\n📷 Traitement : ${originalFileName} -> ${newFileNameNoExt}`);

      let photoEntry = findPhotoById(photosData.photos, i + 1);

      if (photoEntry && photoEntry.src && !FORCE_UPLOAD) {
        // Déjà traité, on s'assure juste que les tags sont normalisés
        console.log(`  ⏭️  Déjà traitée (ID: ${i + 1}), saut de l'upload (utilise --force pour forcer)`);
        photoEntry.keywords = deduplicateKeywords(photoEntry.keywords || ['A classer']);
        continue;
      }

      if (photoEntry && photoEntry.src && FORCE_UPLOAD) {
        console.log(`  🔄 Force upload activé pour ID: ${i + 1}`);
      }

      const fileStats = fs.statSync(filePath);
      let tempFilePath = filePath; // Par défaut on utilise la photo originale
      const fileExt = path.extname(originalFileName).toLowerCase();
      let isTemp = false;
      let fileSize = fileStats.size;

      // Compresser l'image UNIQUEMENT si l'image fait plus de 10MB (limite gratuite Cloudinary)
      if (fileSize > MAX_PHOTO_SIZE) {
        console.log(`  📉 Image > 10MB. Compression minimale pour conserver la qualité...`);
        const compressedBuffer = await compressImage(filePath);
        tempFilePath = path.resolve(THUMBNAILS_DIR, `${newFileNameNoExt}_temp.jpg`);
        fs.writeFileSync(tempFilePath, compressedBuffer);
        isTemp = true;
        fileSize = compressedBuffer.length;
      } else {
        console.log(`  ✅ Poids OK (${Math.round(fileSize/1024/1024*10)/10}MB). Upload de l'original en haute résolution.`);
      }

      // Générer thumbnail
      console.log(`  🖼️  Génération thumbnail...`);
      const thumbnailPath = path.resolve(THUMBNAILS_DIR, `${newFileNameNoExt}.webp`);
      await generateThumbnail(filePath, thumbnailPath);

      // Upload principal en HAUTE RÉSOLUTION
      console.log(`  ☁️  Upload image principale sous le nom ${newFileNameNoExt}...`);
      const imageUrl = await uploadToCloudinary(tempFilePath, `${newFileNameNoExt}${fileExt}`);

      // Upload thumbnail
      console.log(`  ☁️  Upload thumbnail...`);
      const thumbnailUrl = await uploadThumbnail(thumbnailPath, `${newFileNameNoExt}.webp`);

      const currentId = i + 1;
      photoEntry = {
        id: currentId,
        title: `Photo ${currentId}`,
        src: imageUrl,
        thumbnailSrc: thumbnailUrl,
        keywords: ['A classer'], // Tags par défaut (Manuel)
        location: 'Autre',
        isBest: false,
        uploadedAt: new Date(fileTarget.time).toISOString(),
        size: fileSize
      };
      
      // Ajouter ou remplacer l'image brute au fichier json
      let existingIndex = photosData.photos.findIndex(p => p.id === currentId);
      if (existingIndex >= 0) {
        photosData.photos[existingIndex] = photoEntry;
      } else {
        photosData.photos.push(photoEntry);
      }
      
      console.log(`✅ Photo ${currentId} ajoutée (Ajoutez vos tags manuellement dans photos.json)`);

      // Nettoyer temp
      if (isTemp) {
        fs.unlinkSync(tempFilePath);
      }

      // Sauvegarde à chaque photo
      savePhotosData(photosData);

      nextId++;
    } catch (error) {
      console.error(`❌ Erreur traitement ${originalFileName}:`, error.message);
    }
  }

  // Sauvegarder final
  savePhotosData(photosData);
  console.log(`\n✅ Traitement terminé (Mode Manuel)!`);
}

// ============================================
// EXÉCUTION
// ============================================

processPhotos().catch(error => {
  console.error('❌ Erreur fatale :', error);
  process.exit(1);
});
