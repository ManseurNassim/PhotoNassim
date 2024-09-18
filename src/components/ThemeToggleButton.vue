<template>
  <button @click="toggleTheme" class="theme-toggle-button">
    <span v-if="!isDarkTheme" class="icon-sun">☀️</span>
    <span v-if="isDarkTheme" class="icon-moon">🌙</span>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ThemeToggleButton',
  setup() {
    const isDarkTheme = ref(false);

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme');
      isDarkTheme.value = savedTheme === 'dark';
      document.body.classList.toggle('dark-theme', isDarkTheme.value);
      document.body.classList.toggle('light-theme', !isDarkTheme.value);
    });

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.body.classList.toggle('dark-theme', isDarkTheme.value);
      document.body.classList.toggle('light-theme', !isDarkTheme.value);
      localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light');
    };

    return {
      isDarkTheme,
      toggleTheme,
    };
  },
};
</script>

<style scoped>
.theme-toggle-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  width: 48px; /* Largeur égale à la taille de l'icône pour agrandir la zone cliquable */
  height: 48px; /* Hauteur égale à la taille de l'icône */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;
  z-index: 100000;
}

body.dark-theme .theme-toggle-button {
  color: #f4f4f4;
}

.icon-sun, .icon-moon {
  font-size: 32px; /* Taille de l'icône */
  pointer-events: none; /* Désactive les événements de clic sur l'icône elle-même, pour s'assurer que le clic est capté par le bouton */
}

/* Adaptation pour les petits écrans */
@media (max-width: 768px) {
  .theme-toggle-button {
    width: 36px;
    height: 36px;
    font-size: 24px; /* Réduction de la taille de l'icône */
    top: 15px; /* Ajustement de l'espacement */
    right: 15px; /* Ajustement de l'espacement */
  }
}

@media (max-width: 480px) {
  .theme-toggle-button {
    width: 32px;
    height: 32px;
    font-size: 20px; /* Réduction de la taille de l'icône */
    top: 12px; /* Plus d'espacement pour les très petits écrans */
    right: 12px; /* Plus d'espacement pour les très petits écrans */
  }
}
</style>
