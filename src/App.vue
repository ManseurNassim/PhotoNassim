<template>
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <!-- Inclure la barre de navigation -->
    <NavBar :class="{ hidden: isHidden }" />
    <!-- Afficher la vue correspondante à la route -->
    <router-view />
    <!-- Ajouter le bouton de changement de thème -->
    <ThemeToggleButton :class="{ hidden: isHidden }" @click="toggleTheme" />
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

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  transition: background-color 0.3s; /* Transition pour le changement de fond */
}

/* Styles généraux pour le conteneur de l'application */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
  transition: color 0.3s; /* Transition pour le changement de couleur */
}

/* Dark theme styles */
.dark-theme {
  background-color: #121212; /* Couleur de fond en mode nuit */
  color: #e0e0e0; /* Couleur de texte en mode nuit */
}

.dark-theme h1 {
  color: #ffffff; /* Couleur des titres en mode nuit */
}

.dark-theme .photo-item {
  background-color: #1e1e1e; /* Couleur de fond des éléments photo en mode nuit */
}

.dark-theme .photo-view-container {
  background-color: rgba(0, 0, 0, 0.8); /* Couleur de fond de la vue photo en mode nuit */
}

.dark-theme .photo-view-image {
  border: 1px solid #ffffff; /* Bordure des images en mode nuit */
}

/* Classe pour cacher la navbar et les icônes */
.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s ease-in-out;
}

/* Supprimez le style de fond de la navbar lorsqu'elle est cachée */
.navbar.hidden {
  background-color: transparent; /* Pas de couleur de fond pour la navbar cachée */
}

/* Styles spécifiques pour la NavBar en mode sombre */
.dark-theme .navbar {
  background-color: transparent; /* Pas de couleur de fond pour la NavBar visible */
  color: #ffffff; /* Couleur du texte de la navbar en mode sombre */
}
</style>
