const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const thumbnailDir = path.join(__dirname, '../public/images/thumbnails');

if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPathWebP = path.join(thumbnailDir, path.parse(file).name + '.webp');

    sharp(inputPath)
        .resize({ width: 400 }) // Miniature optimisée
        .toFormat('webp')
        .toFile(outputPathWebP)
        .then(() => console.log(`✅ Miniature créée : ${outputPathWebP}`))
        .catch(err => console.error(`❌ Erreur sur ${file}`, err));
});
