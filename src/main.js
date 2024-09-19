// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createGtag } from 'vue-gtag-next';

const app = createApp(App);

// Utilise Vue Router et Vuex
app.use(router);
app.use(store);

// Configuration de Google Analytics avec vue-gtag-next
app.use(createGtag({
  property: {
    id: 'G-HTFKQ319ZT'  // Remplace par ton ID de suivi Google Analytics
  }
}));

// Monte l'application sur l'élément avec l'ID "app"
app.mount('#app');
