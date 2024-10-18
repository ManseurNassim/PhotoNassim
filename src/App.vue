<template>
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <!-- Inclure la barre de navigation avec la classe conditionnelle pour la cacher -->
    <NavBar :class="{ hidden: isHidden }" />
    <!-- Afficher la vue correspondante à la route -->
    <router-view />
    <!-- Ajouter le bouton de changement de thème avec la classe conditionnelle pour le cacher -->
    <ThemeToggleButton :class="{ hidden: isHidden }" />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ThemeToggleButton from './components/ThemeToggleButton.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'App',
  components: {
    NavBar,
    ThemeToggleButton,
  },
  setup() {
    const isDarkTheme = ref(false);
    const lastScrollTop = ref(0);
    const isHidden = ref(false);

    // Fonction pour basculer le thème sombre
    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.body.classList.toggle('dark-theme', isDarkTheme.value);
    };

    // Fonction pour gérer le défilement
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Vérifier si on est en mode portrait (mobile)
      if (window.innerHeight > window.innerWidth) {
        if (scrollTop > lastScrollTop.value) {
          // Si on défile vers le bas, cacher les icônes
          isHidden.value = true;
        } else {
          // Si on défile vers le haut, afficher les icônes
          isHidden.value = false;
        }
        lastScrollTop.value = scrollTop;
      }
    };

    // Ajouter et retirer l'écouteur de défilement au montage/démontage du composant
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isDarkTheme,
      toggleTheme,
      isHidden,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transition: background-color 0.3s, color 0.3s;
}

/* Dark theme styles */
.dark-theme {
  background-color: #121212;
  color: #e0e0e0;
}

.dark-theme h1 {
  color: #ffffff;
}

.dark-theme .photo-item {
  background-color: #1e1e1e;
}

.dark-theme .photo-view-container {
  background-color: rgba(0, 0, 0, 0.8);
}

.dark-theme .photo-view-image {
  border: 1px solid #ffffff;
}

/* Classe pour cacher la navbar et les icônes */
.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s ease-in-out;
}
</style>
