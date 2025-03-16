import { createStore } from 'vuex';
import photos from './data/photos'; // Importer les photos

const store = createStore({
  state: {
    photos: photos, // Utiliser les photos importées
  },
  getters: {
    allPhotos: (state) => state.photos,
    photoById: (state) => (id) => {
      const photo = state.photos.find(photo => photo.id === id);
      return photo
        ? {
            ...photo,
            original: photo.src,       // L'URL de l'image Cloudinary principale
            thumbnail: photo.thumbnailSrc // L'URL de la miniature Cloudinary
          }
        : null;
    },
    
    photosByKeyword: (state) => (keyword) =>
      state.photos.filter(photo => 
        photo.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase()))
      ),
  },
});

export default store;
