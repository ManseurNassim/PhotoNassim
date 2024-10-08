const vision = require('@google-cloud/vision');
const fs = require('fs');
const path = require('path');
const translate = require('translate-google');
const sizeOf = require('image-size');

// Initialiser le client Vision
const client = new vision.ImageAnnotatorClient();

// Chemins d'accès
const imageDir = path.join(__dirname, '../public/images'); // Répertoire des images
const photosFile = path.join(__dirname, '../src/data/photos_copy.js'); // Fichier photos_copy.js

// Lire les images du répertoire
const images = fs.readdirSync(imageDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));

// Charger le fichier photos_copy.js existant
let photos = require('../src/data/photos_copy.js').photos;

// Fonction pour analyser une image et générer des tags
async function generateTagsForImage(image) {
  const filePath = path.join(imageDir, image);

  // Envoyer l'image à l'API Google Vision
  const [result] = await client.labelDetection(filePath);
  const labels = result.labelAnnotations;

  // Extraire les descriptions des labels
  let englishTags = labels.map(label => label.description);

  // Traduire les descriptions en français avec gestion d'erreur
  let frenchTags;
  try {
    frenchTags = await translate(englishTags, { to: 'fr' });
  } catch (error) {
    console.error('Erreur lors de la traduction des tags:', error);
    frenchTags = englishTags; // On utilise les tags en anglais en cas d'erreur
  }

  // Garde uniquement les premiers mots des mots composés et supprime les doublons
  frenchTags = frenchTags.map(tag => tag.split(' ')[0]).filter((value, index, self) => self.indexOf(value) === index);

  // Ajouter le tag "animal" si la photo contient un animal
  const animalTags = ['animal', 'mammifère', 'oiseau', 'poisson', 'reptile'];
  if (animalTags.some(tag => frenchTags.includes(tag.toLowerCase()))) {
    frenchTags.push('animal');
  }

  // Forcer à avoir exactement 15 tags
  while (frenchTags.length < 15) {
    frenchTags.push(''); // Ajouter des chaînes vides pour s'assurer d'avoir 15 éléments
  }

  return frenchTags.slice(0, 15); // Toujours renvoyer 15 tags
}

// Fonction pour déterminer si la photo est prise de jour ou de nuit
function determineDayOrNight(labels) {
  const nightTags = ['nuit', 'sombre', 'étoiles'];
  return nightTags.some(tag => labels.includes(tag)) ? 'nuit' : 'jour';
}

// Fonction pour déterminer l'orientation (portrait ou paysage)
function determineOrientation(filePath) {
  const { width, height } = sizeOf(filePath);
  return width > height ? 'paysage' : 'portrait';
}

// Fonction pour fusionner les nouveaux tags avec les anciens en évitant les doublons
function mergeTags(oldTags, newTags) {
  const combinedTags = [...oldTags];
  newTags.forEach(tag => {
    if (!combinedTags.includes(tag)) {
      combinedTags.push(tag);
    }
  });
  return combinedTags;
}

// Fonction pour mettre à jour photos_copy.js avec les nouveaux tags
async function updatePhotos() {
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const filePath = path.join(imageDir, image);
    const newTags = await generateTagsForImage(image);

    // Déterminer si c'est le jour ou la nuit
    const dayOrNight = determineDayOrNight(newTags);

    // Déterminer l'orientation de la photo
    const orientation = determineOrientation(filePath);

    // Ajouter "jour" ou "nuit" dans les tags
    newTags.push(dayOrNight);

    // Ajouter "portrait" ou "paysage" dans les tags
    newTags.push(orientation);

    // Trouver l'index de l'image dans le fichier photos
    let photoIndex = photos.findIndex(p => p.src.includes(image));

    if (photoIndex !== -1) {
      // Si l'image existe déjà, on fusionne les nouveaux tags avec les anciens
      photos[photoIndex].keywords = mergeTags(photos[photoIndex].keywords, newTags);
    } else {
      // Si l'image n'existe pas, on ajoute une nouvelle entrée avec les nouveaux tags
      photos.push({
        id: photos.length + 1,
        title: `Photo ${photos.length + 1}`,
        src: `/images/${image}`,
        thumbnailSrc: `/images/thumbs/${image}`,
        keywords: newTags,
        isBest: false
      });
    }
  }

  // Écrire le fichier photos_copy.js mis à jour
  const newPhotosContent = `module.exports = { photos: ${JSON.stringify(photos, null, 2)} };`;

  fs.writeFileSync(photosFile, newPhotosContent, 'utf8');
  console.log('Mise à jour de photos_copy.js terminée');
}

// Lancer la mise à jour
updatePhotos().catch(console.error);
