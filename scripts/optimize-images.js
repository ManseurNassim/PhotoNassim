const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Répertoires source et destination
const inputDir = path.join(__dirname, '../public/images'); // Chemin relatif à partir du répertoire du script
const thumbnailDir = path.join(__dirname, '../public/images/thumbnails'); // Assurez-vous que ce chemin est correct

// Créez le répertoire de miniatures s'il n'existe pas
if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true }); // Assurez-vous que les répertoires parents sont créés également
}

// Créer des miniatures des images
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Erreur de lecture du répertoire :', err);
        return;
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const thumbnailFilePath = path.join(thumbnailDir, file);

        // Créer une miniature de l'image
        sharp(inputFilePath)
            .resize(150, 150) // Créer une miniature de 150x150 pixels
            .toFormat('jpg') // Assurez-vous que la miniature est au format JPG
            .toFile(thumbnailFilePath, (err, info) => {
                if (err) {
                    console.error('Erreur de traitement de la miniature :', err);
                    return;
                }
                console.log(`Miniature créée : ${file}`);
            });
    });
});
