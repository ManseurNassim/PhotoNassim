<template>
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <!-- Inclure la barre de navigation -->
    <NavBar />
    <!-- Afficher la vue correspondante à la route -->
    <router-view />
    <!-- Ajouter le bouton de changement de thème -->
    <ThemeToggleButton />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ThemeToggleButton from './components/ThemeToggleButton.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    NavBar,
    ThemeToggleButton,
  },
  setup() {
    const isDarkTheme = ref(false);

    // Toggle function for dark mode
    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.body.classList.toggle('dark-theme', isDarkTheme.value);
    };

    return {
      isDarkTheme,
      toggleTheme,
    };
  },
};
</script>

<style>
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
</style>
