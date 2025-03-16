import fs from "fs";
import path from "path";

// 🛠 Définition du chemin correct du fichier `photos.js`
const filePath = path.resolve("./src/data/photos.js"); // Chemin absolu

// Vérifier si le fichier existe
if (!fs.existsSync(filePath)) {
  console.error(`❌ ERREUR : Le fichier "${filePath}" n'existe pas.`);
  process.exit(1); // Quitte le programme avec une erreur
}

// 🖼️ Base URL Cloudinary (MODIFIE selon ton dossier Cloudinary)
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/ddcsplrer/image/upload/v1742153632/mes-images/";
const CLOUDINARY_THUMBNAIL_URL = "https://res.cloudinary.com/ddcsplrer/image/upload/v1742153632/mes-images/thumbnails/";

// Lire le fichier `photos.js`
let fileContent = fs.readFileSync(filePath, "utf-8");

// 🛠 Remplacer les chemins des images locales par ceux de Cloudinary
fileContent = fileContent.replace(/(["'])(\.\/images\/)([^"']+)(["'])/g, (match, p1, p2, filename, p4) => {
  return `${p1}${CLOUDINARY_BASE_URL}${filename}${p4}`;
});

// 🛠 Remplacer les chemins des miniatures par ceux de Cloudinary (si elles existent)
fileContent = fileContent.replace(/(["'])(\.\/images\/thumbnails\/)([^"']+)(["'])/g, (match, p1, p2, filename, p4) => {
  return `${p1}${CLOUDINARY_THUMBNAIL_URL}${filename}${p4}`;
});

// 📝 Écrire les nouvelles valeurs dans `photos.js`
fs.writeFileSync(filePath, fileContent, "utf-8");

console.log("✅ `photos.js` mis à jour avec les URLs Cloudinary (images + miniatures) !");
