<template>
  <nav class="navbar glass">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        <i class="fas fa-camera logo-icon"></i>
        <h2>Nassim Photo</h2>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="navbar-desktop">

        <router-link to="/photos">Photos</router-link>
        <router-link to="/about">À Propos</router-link>
        <router-link to="/equipment">Matériel</router-link>
      </div>
      
      <div class="navbar-actions">
        <ThemeToggleButton />
        <button class="navbar-burger" @click="toggleMenu" aria-label="Menu">
          <span class="burger-line" :class="{ active: isMenuActive }"></span>
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="isMenuActive" class="menu-overlay" @click="closeMenu"></div>

    <!-- Mobile Menu -->
    <div class="navbar-menu" :class="{ active: isMenuActive }">
      <ul class="navbar-links">

        <li><router-link to="/photos" @click="closeMenu">Photos</router-link></li>
        <li><router-link to="/about" @click="closeMenu">À Propos</router-link></li>
        <li><router-link to="/equipment" @click="closeMenu">Matériel</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import ThemeToggleButton from '../ui/ThemeToggleButton.vue';

export default {
  components: {
    ThemeToggleButton
  },
  data() {
    return {
      isMenuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    closeMenu() {
      this.isMenuActive = false;
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  border-bottom: 1px solid var(--color-border);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-text-primary);
}

.logo-icon {
  font-size: 1.2rem;
  color: var(--color-accent);
}

.navbar-logo h2 {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* Burger Menu Button */
.navbar-burger {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3000;
}

.burger-line {
  width: 24px;
  height: 2px;
  background-color: var(--color-text-primary);
  position: relative;
  transition: all var(--transition-speed) var(--transition-ease-smooth);
}

.burger-line::before,
.burger-line::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--color-text-primary);
  transition: all var(--transition-speed) var(--transition-ease-smooth);
}

.burger-line::before {
  top: -7px;
  left: 0;
}

.burger-line::after {
  top: 7px;
  left: 0;
}

/* Active state (X shape) */
.burger-line.active {
  background-color: transparent;
}

.burger-line.active::before {
  transform: rotate(45deg);
  top: 0;
}

.burger-line.active::after {
  transform: rotate(-45deg);
  top: 0;
}

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  animation: fadeIn var(--transition-speed) var(--transition-ease-smooth);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Mobile Menu - Slides from RIGHT */
.navbar-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: var(--color-bg);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  z-index: 2500;
  transform: translateX(100%);
  transition: transform var(--transition-speed) var(--transition-ease-smooth);
  padding: 80px var(--spacing-md) var(--spacing-md);
}

.dark-theme .navbar-menu {
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.3);
}

.navbar-menu.active {
  transform: translateX(0);
}

.navbar-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.navbar-links a {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-text-primary);
  display: block;
  padding: var(--spacing-sm) 0;
  transition: all var(--transition-speed) ease;
  border-bottom: 1px solid transparent;
}

.navbar-links a:hover {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

.navbar-links a.router-link-exact-active {
  color: var(--color-accent);
  font-weight: 500;
}

.navbar-desktop {
  display: none;
  gap: var(--spacing-lg);
  margin-left: auto;
  margin-right: var(--spacing-lg);
}

.navbar-desktop a {
  text-decoration: none;
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: opacity var(--transition-speed) var(--transition-ease-smooth);
}

.navbar-desktop a:hover {
  opacity: 0.7;
}

.navbar-desktop a.router-link-exact-active {
  font-weight: 600;
  color: var(--color-accent);
}

/* Responsive Handling */
@media (min-width: 768px) {
  .navbar-desktop {
    display: flex;
  }

  .navbar-burger {
    display: none;
  }
  
  .navbar-menu {
    display: none;
  }
  
  .menu-overlay {
    display: none;
  }
}
@media (max-width: 767px) {
  .navbar-desktop {
    display: none;
  }
}
</style>
