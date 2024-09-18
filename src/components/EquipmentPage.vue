<!-- src/views/EquipmentPage.vue -->
<template>
  <div class="equipment-page">
    <h1>Mon Matériel</h1>
    
    <!-- Section Appareil photo -->
    <div class="equipment-item">

      <div class="equipment-details">
        <h2>Appareil photo</h2>
        <p>Canon EOS R100</p>
        <img src="/images/cannon-eos.webp" alt="Canon EOS R100" class="equipment-photo" />
      </div>
    </div>
    
    <!-- Section Objectif -->
    <div class="equipment-item">

      <div class="equipment-details">
        <h2>Objectif</h2>
        <p>RF-S 18-45mm F4.5-6.3 IS STM</p>
        <img src="/images/cannon-eos-r100-objectif.jpg" alt="RF-S 18-45mm F4.5-6.3 IS STM" class="equipment-photo" />
      </div>
    </div>
    
    <!-- Section Logiciel -->
    <div class="equipment-item">

      <div class="equipment-details">
        <h2>Logiciel</h2>
        <p>Adobe Lightroom</p>
        <img src="/images/adobe-lightroom.jpg" alt="Adobe Lightroom" class="equipment-photo" />
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
.equipment-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark-theme .equipment-page {
  background-color: #333; /* Fond pour le mode nuit */
  color: #f0f0f0; /* Couleur du texte pour le mode nuit */
}

h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 30px;
}

.dark-theme h1 {
  color: #f0f0f0; /* Couleur du titre pour le mode nuit */
}

.equipment-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.equipment-photo {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.equipment-photo:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.equipment-details {
  text-align: center;
}

.equipment-details h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #42b983;
}

.dark-theme .equipment-details h2 {
  color: #76d7c4; /* Couleur des sous-titres pour le mode nuit */
}

.equipment-details p {
  font-size: 1.2em;
  color: #555;
}

.dark-theme .equipment-details p {
  color: #ddd;
}

/* Styles spécifiques pour mobile */
@media (max-width: 768px) {
  .equipment-item {
    flex-direction: column;
  }

  .equipment-photo {
    width: 250px;
    height: 250px;
  }
}
</style>
