import { createStore } from 'vuex';
import photosData from './data/photos.json'; // Importer le JSON statique

const store = createStore({
  state: {
    photos: photosData.photos || [],
    lightbox: {
      isOpen: false,
      photos: [],
      currentIndex: 0
    }
  },
  mutations: {
    OPEN_LIGHTBOX(state, { photos, index }) {
      state.lightbox.photos = photos;
      state.lightbox.currentIndex = index;
      state.lightbox.isOpen = true;
    },
    CLOSE_LIGHTBOX(state) {
      state.lightbox.isOpen = false;
      // On ne vide pas forcément photos pour éviter reset brutal, mais isOpen fait le job
    },
    SET_LIGHTBOX_INDEX(state, index) {
      state.lightbox.currentIndex = index;
    }
  },
  getters: {
    allPhotos: (state) => state.photos,
    photoById: (state) => (id) => {
      const photo = state.photos.find(photo => photo.id === id);
      return photo
        ? {
            ...photo,
            original: photo.src,
            thumbnail: photo.thumbnailSrc
          }
        : null;
    },
    photosByKeyword: (state) => (keyword) =>
      state.photos.filter(photo => 
        photo.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase()))
      ),
    
    // Lightbox getters
    isLightboxOpen: (state) => state.lightbox.isOpen,
    lightboxPhotos: (state) => state.lightbox.photos,
    lightboxCurrentIndex: (state) => state.lightbox.currentIndex,
  },
});

export default store;
