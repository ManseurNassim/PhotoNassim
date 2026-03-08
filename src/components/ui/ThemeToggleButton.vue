<template>
  <button @click="toggleTheme" class="theme-toggle" aria-label="Toggle theme">
    <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
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
    });

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.body.classList.toggle('dark-theme', isDarkTheme.value);
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
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  box-shadow: var(--shadow-subtle);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-medium);
}

.theme-toggle i {
  font-size: 1.2rem;
  transition: transform var(--transition-speed) ease;
}

.theme-toggle:hover i {
  transform: rotate(20deg);
}
</style>
