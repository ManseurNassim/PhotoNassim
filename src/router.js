import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import PhotoPage from './views/PhotoPage.vue';
import AboutPage from './views/AboutPage.vue';
import EquipmentPage from './views/EquipmentPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/photos', name: 'photos', component: PhotoPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/equipment', name: 'equipment', component: EquipmentPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ajoutez un navigation guard pour faire défiler la page vers le haut
router.beforeEach(() => {
  window.scrollTo(0, 0);
});

export default router;
