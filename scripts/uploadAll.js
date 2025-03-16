import fs from "fs";
import path from "path";
import FormData from "form-data";
import fetch from "node-fetch";

const folderPath = path.join(process.cwd(), ".", "/images"); // Dossier images
const serverUrl = "http://localhost:3000/upload-multiple";

// Vérifier que le dossier existe
if (!fs.existsSync(folderPath)) {
  console.error(`❌ Le dossier ${folderPath} n'existe pas.`);
  process.exit(1);
}

async function uploadSingleFile(filePath, fileName) {
  const stats = fs.statSync(filePath);
  const fileSizeInMB = stats.size / (1024 * 1024);

  console.log(`📤 Envoi du fichier : ${fileName} (${fileSizeInMB.toFixed(2)}MB)`);

  const formData = new FormData();
  formData.append("files", fs.createReadStream(filePath), fileName);

  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      console.log(`✅ Upload réussi : ${fileName}`, data);
    } catch (error) {
      console.error(`❌ Erreur lors de l'upload de ${fileName} :`, text);
    }
  } catch (error) {
    console.error(`❌ Erreur réseau pour ${fileName} :`, error);
  }
}

async function uploadAllImages() {
  const files = fs.readdirSync(folderPath).filter(file => {
    const filePath = path.join(folderPath, file);
    return fs.statSync(filePath).isFile();
  });

  if (files.length === 0) {
    console.log("⚠️ Aucun fichier à envoyer.");
    return;
  }

  console.log(`🔄 Début de l'upload de ${files.length} fichiers...`);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    await uploadSingleFile(filePath, file); // Envoie un fichier à la fois
  }

  console.log("✅ Tous les fichiers ont été envoyés !");
}

uploadAllImages();
