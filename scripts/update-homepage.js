import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dataPath = path.resolve('./src/data/photos.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const thumbDir = path.resolve('./public/thumbnails');

async function main() {
  const pList = [];
  for (const p of data.photos) {
    const thumbName = p.thumbnailSrc.split('/').pop();
    const pPath = path.join(thumbDir, thumbName);
    if (fs.existsSync(pPath)) {
      const meta = await sharp(pPath).metadata();
      const ratio = meta.width / meta.height;
      pList.push({ id: p.id, ratio, size: p.size });
    }
  }
  
  // Sort by size (proxy for quality / resolution)
  pList.sort((a,b) => b.size - a.size);
  
  // Select slots
  const selected = new Set();
  function pick(condition) {
    for (const item of pList) {
      if (!selected.has(item.id) && condition(item)) {
        selected.add(item.id);
        return item.id;
      }
    }
    // fallback
    for (const item of pList) {
      if (!selected.has(item.id)) {
        selected.add(item.id);
        return item.id;
      }
    }
  }

  // slots
  // 0: span 8x2 -> 8cols/2rows -> very wide landscape -> ratio > 1.3
  const s0 = pick(p => p.ratio > 1.3);
  // 1: span 4x1 -> 4cols/1row -> landscape -> ratio >= 1.0
  const s1 = pick(p => p.ratio >= 1.0);
  // 2: span 4x1 -> 4cols/1row -> landscape -> ratio >= 1.0
  const s2 = pick(p => p.ratio >= 1.0);
  // 3: span 4x2 -> 4cols/2rows -> portrait -> ratio < 0.95
  const s3 = pick(p => p.ratio < 0.95);
  // 4: span 8x2 -> 8cols/2rows -> landscape -> ratio > 1.2
  const s4 = pick(p => p.ratio > 1.2);
  // 5: span 12x2 -> 12cols/2rows -> very wide panorama -> ratio > 1.5
  const s5 = pick(p => p.ratio > 1.5);

  const bestOrders = [s0, s1, s2, s3, s4, s5];
  console.log("Selected IDs for slots 0-5:", bestOrders);
  
  // update JSON
  data.photos.forEach(p => {
    p.isBest = false;
    delete p.bestOrder;
  });

  bestOrders.forEach((id, index) => {
    const p = data.photos.find(x => x.id === id);
    if (p) {
      p.isBest = true;
      p.bestOrder = index;
    }
  });

  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("photos.json updated with perfect layout placement!");
}
main().catch(console.error);
