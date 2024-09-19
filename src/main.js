import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueGtag from 'vue-gtag-next'; // Import du plugin correct

const app = createApp(App);

// Utilise Vue Router et Vuex
app.use(router);
app.use(store);

// Configuration de Google Analytics avec vue-gtag-next
app.use(VueGtag, {
  property: {
    id: 'G-HTFKQ319ZT'  // Remplace par ton ID de suivi Google Analytics
  }
});

// Monte l'application sur l'élément avec l'ID "app"
app.mount('#app');
