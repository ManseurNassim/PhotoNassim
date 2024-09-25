<template>
  <div class="photos-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher par mots-clés, essayer paysage, architecture, nuit ..."
      class="search-bar"
    />
    <div class="photos-grid">
      <div
        v-for="photo in filteredPhotos"
        :key="photo.id"
        class="photo-item"
        @click="openModal(photo.id)"
      >
        <img :src="photo.thumbnailSrc" :alt="photo.title" class="photo-thumbnail" />
      </div>
    </div>

    <div v-if="selectedPhotoId" class="modal" @click="handleModalClick">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <img :src="currentPhoto.src" :alt="currentPhoto.title" class="modal-photo" />
      </div>
      <div class="modal-navigation">
        <button class="nav-button prev-button" @click="prevPhoto">
          &#10094;
        </button>
        <button class="nav-button next-button" @click="nextPhoto">
          &#10095;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PhotosPage',
  setup() {
    const store = useStore();
    const selectedPhotoId = ref(null);
    const searchQuery = ref('');

    const photos = computed(() => store.getters.allPhotos);

    // Ajout d'un champ thumbnailSrc pour les vignettes dans les photos
    const filteredPhotos = computed(() => {
      if (searchQuery.value) {
        return store.getters.photosByKeyword(searchQuery.value.toLowerCase());
      }
      return photos.value;
    });

    const currentPhoto = computed(() => {
      return store.getters.photoById(selectedPhotoId.value);
    });

    const openModal = (id) => {
      selectedPhotoId.value = id;
    };

    const closeModal = () => {
      selectedPhotoId.value = null;
    };

    const handleModalClick = (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    // Fonction pour aller à la photo précédente en tenant compte des filtres
    const prevPhoto = () => {
      const index = filteredPhotos.value.findIndex(
        (photo) => photo.id === selectedPhotoId.value
      );
      if (index === 0) {
        selectedPhotoId.value = filteredPhotos.value[filteredPhotos.value.length - 1].id;
      } else {
        selectedPhotoId.value = filteredPhotos.value[index - 1].id;
      }
    };

    // Fonction pour aller à la photo suivante en tenant compte des filtres
    const nextPhoto = () => {
      const index = filteredPhotos.value.findIndex(
        (photo) => photo.id === selectedPhotoId.value
      );
      if (index === filteredPhotos.value.length - 1) {
        selectedPhotoId.value = filteredPhotos.value[0].id;
      } else {
        selectedPhotoId.value = filteredPhotos.value[index + 1].id;
      }
    };

    return {
      photos,
      filteredPhotos,
      selectedPhotoId,
      currentPhoto,
      searchQuery,
      openModal,
      closeModal,
      handleModalClick,
      prevPhoto,
      nextPhoto,
    };
  },
};
</script>

<style scoped>
.photos-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  width: 100%;
  max-width: 1200px;
}

.photo-item {
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  background-color: #f0f0f0;
}

.photo-item:hover {
  transform: scale(1.05);
}

.photo-thumbnail {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
}

.modal-photo {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.modal-navigation {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
}

.nav-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s, color 0.3s, opacity 0.3s;
  opacity: 0.8;
}

.nav-button:hover {
  transform: scale(1.2);
  color: #ddd;
  opacity: 1;
}

.prev-button {
  margin-right: auto;
}

.next-button {
  margin-left: auto;
}

@media (max-width: 768px) {
  .photos-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .nav-button {
    font-size: 25px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .search-bar {
    max-width: 100%;
  }

  .nav-button {
    font-size: 20px;
    padding: 5px;
  }
}

/* Styles pour le mode nuit */
.dark-theme .search-bar {
  border: 1px solid #666;
  background-color: #333;
  color: #fff;
}

.dark-theme .photos-grid {
  background-color: #1e1e1e;
}

.dark-theme .photo-item {
  background-color: #2e2e2e;
}

.dark-theme .photo-thumbnail {
  border: 1px solid #666;
}

.dark-theme .modal {
  background-color: rgba(0, 0, 0, 0.9);
}

.dark-theme .modal-content {
  border: 1px solid #444;
}

.dark-theme .close-button {
  color: #fff;
}

.dark-theme .nav-button {
  color: #fff;
}

.dark-theme .nav-button:hover {
  color: #ddd;
}
</style>
