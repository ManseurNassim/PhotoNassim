<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Mon Matériel</h1>
    </div>
    
    <div class="equipment-grid">
      <div class="equipment-card card">
        <h2 class="equipment-title">Appareil photo</h2>
        <a href="https://store.canon.fr/canon-appareil-photo-hybride-canon-eos-r100-objectif-rf-s-18-45mm-f4-5-6-3-is-stm/6052C033/" target="_blank">
          <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291772/portfolio/assets/cannon-eos-r100.jpg" alt="Canon EOS R100" class="equipment-image" loading="lazy" />
        </a>
        <p class="equipment-name">Canon EOS R100</p>
      </div>
      
      <div class="equipment-card card">
        <h2 class="equipment-title">Objectif</h2>
        <a href="https://store.canon.fr/canon-objectif-canon-rf-s-18-45mm-f4-5-6-3-is-stm/4858C005/" target="_blank">
          <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291771/portfolio/assets/cannon-eos-r100-objectif.jpg" alt="RF-S 18-45mm F4.5-6.3 IS STM" class="equipment-image" loading="lazy" />
        </a>
        <p class="equipment-name">RF-S 18-45mm F4.5 - F6.3 IS STM</p>
      </div>
      
      <div class="equipment-card card">
        <h2 class="equipment-title">Logiciel</h2>
        <a href="https://www.adobe.com/fr/products/photoshop-lightroom.html" target="_blank">
          <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291771/portfolio/assets/adobe-lightroom.jpg" alt="Adobe Lightroom" class="equipment-image" loading="lazy" />
        </a>
        <p class="equipment-name">Adobe Lightroom</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentPage',
};
</script>

<style scoped>
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.equipment-card {
  text-align: center;
  padding: var(--spacing-lg);
}

.equipment-title {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.equipment-image {
  width: 100%;
  max-width: 300px;
  height: 300px;
  object-fit: contain;
  border-radius: 4px;
  margin: 0 auto var(--spacing-md);
  display: block;
  transition: transform var(--transition-speed) ease;
}

.equipment-image:hover {
  transform: scale(1.03);
}

.equipment-name {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  font-weight: 400;
}

@media (max-width: 768px) {
  .equipment-grid {
    grid-template-columns: 1fr;
  }
  
  .equipment-image {
    max-width: 250px;
    height: 250px;
  }
}
</style>
