// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueGtag from 'vue-gtag-next';
import Vue3TouchEvents from 'vue3-touch-events';

// Création de l'application Vue
const app = createApp(App);

// Utilisation de Vue Router et Vuex
app.use(router);
app.use(store);

// Configuration de Google Analytics avec vue-gtag-next
app.use(VueGtag, {
  property: {
    id: 'G-HTFKQ319ZT' // Remplacez par votre ID de suivi Google Analytics
  }
});

// Configuration de la prise en charge des événements tactiles
app.use(Vue3TouchEvents);

// Monte l'application sur l'élément avec l'ID "app"
app.mount('#app');
