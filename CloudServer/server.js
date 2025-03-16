import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import sharp from "sharp"; // 📌 Ajout de sharp pour la compression

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("🔍 CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("🔍 CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "OK" : "NON DÉFINI");
console.log("🔍 CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "OK" : "NON DÉFINI");

const app = express();
const port = 3000;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Configurer Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Vérifie si les dossiers `uploads/` et `thumbnails/` existent, sinon les crée
if (!fs.existsSync("uploads/")) fs.mkdirSync("uploads/");
if (!fs.existsSync("thumbnails/")) fs.mkdirSync("thumbnails/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

/**
 * 📌 Fonction pour compresser une image sans dépasser 10MB
 */
async function compressImage(inputPath, outputPath) {
  try {
    let quality = 90; // Commence avec une qualité haute
    let newSize = fs.statSync(inputPath).size;

    while (newSize > MAX_FILE_SIZE && quality > 40) {
      await sharp(inputPath)
        .jpeg({ quality })
        .toFile(outputPath);

      newSize = fs.statSync(outputPath).size;
      quality -= 5; // Réduit progressivement la qualité
    }

    console.log(`📉 Compression : ${inputPath} → ${outputPath} (Final: ${(newSize / 1024 / 1024).toFixed(2)} MB)`);
    return outputPath;
  } catch (error) {
    console.error(`❌ Échec de compression : ${inputPath}`, error);
    return null;
  }
}

/**
 * 📌 Fonction pour générer une miniature carrée 500x500px
 */
async function generateThumbnail(inputPath, thumbPath) {
  try {
    await sharp(inputPath)
      .resize(500, 500, { fit: "cover", position: "center" }) // Carré 500x500, centré
      .toFile(thumbPath);

    console.log(`🖼️ Miniature créée : ${inputPath} → ${thumbPath}`);
    return thumbPath;
  } catch (error) {
    console.error(`❌ Erreur génération miniature : ${inputPath}`, error);
    return null;
  }
}

/**
 * 📤 Route d'upload avec compression et miniatures
 */
app.post("/upload-multiple", upload.array("files", 50), async (req, res) => {
  console.log("🟢 Fichiers reçus :", req.files.map(f => f.originalname));

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Aucun fichier reçu" });
  }

  let uploadedImages = [];

  for (const file of req.files) {
    let result = null;
    let filePath = file.path;
    let compressedPath = filePath.replace(/\.[^.]+$/, "_compressed.jpg");
    let thumbnailPath = `thumbnails/${file.originalname}`;
    let fileName = path.parse(file.originalname).name;

    try {
      // 📌 Compression si fichier > 10MB
      if (file.size > MAX_FILE_SIZE) {
        console.warn(`⚠️ Compression : ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        const compressedFile = await compressImage(filePath, compressedPath);
        if (!compressedFile) continue;
        filePath = compressedFile;
      }

      // 📌 Génération de la miniature
      await generateThumbnail(filePath, thumbnailPath);

      console.log(`🚀 Upload : ${file.originalname} → ${filePath}`);

      // **Upload image principale**
      result = await cloudinary.v2.uploader.upload(filePath, {
        resource_type: "image",
        folder: "mes-images",
        public_id: fileName,
        use_filename: true,
        unique_filename: false,
        overwrite: true // Écrase les fichiers du même nom
      });

      if (!result.secure_url) {
        console.error(`❌ Échec Cloudinary : ${file.originalname}`);
        throw new Error(`Cloudinary n'a pas retourné d'URL pour ${file.originalname}`);
      }

      console.log(`✅ Upload réussi : ${file.originalname} → ${result.secure_url}`);
      uploadedImages.push({
        original: result.secure_url,
        thumbnail: null
      });

      // **Upload miniature**
      const thumbResult = await cloudinary.v2.uploader.upload(thumbnailPath, {
        resource_type: "image",
        folder: "mes-images/thumbnails",
        public_id: fileName,
        use_filename: true,
        unique_filename: false,
        overwrite: true // Écrase les miniatures du même nom
      });

      if (thumbResult.secure_url) {
        console.log(`✅ Miniature uploadée : ${file.originalname} → ${thumbResult.secure_url}`);
        uploadedImages[uploadedImages.length - 1].thumbnail = thumbResult.secure_url;
      }

    } catch (error) {
      console.error(`❌ Erreur upload : ${file.originalname}`, error);
    }
  }

  res.json({ success: true, images: uploadedImages });
});

app.listen(port, () => console.log(`🚀 Serveur en écoute sur http://localhost:${port}`));
