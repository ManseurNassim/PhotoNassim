<template>
  <div class="photos-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Recherche par mots-clés (paysage, architecture, nuit...)"
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

    <!-- Lecteur d'image modal -->
    <div
      v-if="selectedPhotoId"
      class="modal"
      @click="handleModalClick"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <img :src="currentPhoto.src" :alt="currentPhoto.title" class="modal-photo" />
      </div>
      <div class="modal-navigation">
        <button class="nav-button prev-button" @click="prevPhoto">&#10094;</button>
        <button class="nav-button next-button" @click="nextPhoto">&#10095;</button>
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

    // Gestion des mouvements de glissement
    let touchStartX = 0;
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchDiff = touchStartX - touchEndX;
      if (Math.abs(touchDiff) > 50) {
        touchDiff > 0 ? nextPhoto() : prevPhoto();
      }
    };

    const prevPhoto = () => {
      const index = filteredPhotos.value.findIndex(
        (photo) => photo.id === selectedPhotoId.value
      );
      selectedPhotoId.value = index === 0
        ? filteredPhotos.value[filteredPhotos.value.length - 1].id
        : filteredPhotos.value[index - 1].id;
    };

    const nextPhoto = () => {
      const index = filteredPhotos.value.findIndex(
        (photo) => photo.id === selectedPhotoId.value
      );
      selectedPhotoId.value = index === filteredPhotos.value.length - 1
        ? filteredPhotos.value[0].id
        : filteredPhotos.value[index + 1].id;
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
      handleTouchStart,
      handleTouchEnd,
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

/* Barre de recherche et grille de photos */
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
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Modal de visualisation des photos */
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

/* Navigation dans le modal */
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
  cursor: pointer;
  padding: 10px;
  opacity: 0.8;
}

.nav-button:hover {
  color: #ddd;
  opacity: 1;
}
</style>
