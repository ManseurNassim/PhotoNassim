import { createRouter, createWebHistory } from 'vue-router';
import PhotosPage from './components/PhotoPage.vue';
import AboutPage from './components/AboutPage.vue';
import EquipmentPage from './components/EquipmentPage.vue';
import HomePage from './components/HomePage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/photos', name: 'photos', component: PhotosPage },
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
