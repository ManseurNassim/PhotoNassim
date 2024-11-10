<template>
  <div class="home-container">
    <h1 class="home-title">Aperçu des Photos</h1>
    <div class="photos-grid">
      <div
        v-for="photo in bestPhotos"
        :key="photo.id"
        class="photo-item"
      >
        <a :href="photo.src" target="_blank" rel="noopener noreferrer">
          <img :src="photo.src" :alt="photo.title" class="photo-image" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomePage',
  setup() {
    const store = useStore();

    // Filtrer les meilleures photos
    const bestPhotos = computed(() => {
      return store.getters.allPhotos.filter(photo => photo.isBest);
    });

    return {
      bestPhotos,
    };
  },
};
</script>

<style scoped>
.home-container {
  padding: 20px;
  text-align: center;
}

/* Titre de la page */
.home-title {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333; /* Couleur par défaut */
}

/* Grille des photos */
.photos-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Item photo */
.photo-item {
  overflow: auto;
  border-radius: 10px; /* Rayon de bordure de l'élément parent */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #ffffff;
}

/* Image des photos */
.photo-image {
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px; /* Le même rayon que .photo-item pour que l'image épouse la forme */
  transition: filter 0.3s ease;
}

/* Effet de survol des photos */
.photo-item:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

/* Effet de survol des images */
.photo-item:hover .photo-image {
  filter: brightness(1.05) contrast(1.05);
}


/* Styles pour le mode nuit */
.dark-theme .home-title {
  color: #ffffff; /* Couleur du titre en mode nuit */
}

.dark-theme .photo-item {
  background-color: #1e1e1e; /* Fond des items photo en mode nuit */
}

.dark-theme .photo-image {
  border: 1px solid #ffffff; /* Bordure blanche pour les images en mode nuit */
}
</style>
