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
        <li><router-link to="/" @click="closeMenu">Accueil</router-link></li>
        <div class="menu-separator"></div>
        <li><router-link to="/photos" @click="closeMenu">Photos</router-link></li>
        <li><router-link to="/about" @click="closeMenu">À Propos</router-link></li>
        <li><router-link to="/equipment" @click="closeMenu">Matériel</router-link></li>
      </ul>

      <div class="menu-social">
        <a href="https://www.instagram.com/n4ssimm_" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
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
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3000;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.navbar-burger:hover {
  background-color: var(--color-border);
}

.burger-line {
  width: 20px;
  height: 1.5px;
  background-color: var(--color-text-primary);
  position: relative;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.burger-line::before,
.burger-line::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 1.5px;
  background-color: var(--color-text-primary);
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.burger-line::before {
  top: -6px;
  left: 0;
}

.burger-line::after {
  top: 6px;
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
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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
  width: 100%;
  max-width: 320px;
  height: 100vh;
  background: var(--color-overlay);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.05);
  z-index: 2500;
  transform: translateX(100%);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 100px var(--spacing-md) var(--spacing-md);
  display: flex;
  flex-direction: column;
}

.dark-theme .navbar-menu {
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
  background: rgba(15, 15, 15, 0.85);
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
  gap: var(--spacing-sm);
}

.navbar-links li {
  overflow: hidden;
}

.menu-separator {
  height: 1px;
  background: var(--color-border);
  margin: var(--spacing-sm) 0;
  width: 40px;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s var(--transition-ease-smooth);
}

.navbar-menu.active .menu-separator {
  opacity: 1;
  transform: translateX(0);
}

.navbar-menu.active .menu-separator:nth-of-type(1) { transition-delay: 0.15s; }

.navbar-links a {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 300;
  color: var(--color-text-primary);
  display: block;
  padding: var(--spacing-xs) 0;
  transition: all 0.4s var(--transition-ease-smooth);
  opacity: 0;
  transform: translateY(20px);
}

.navbar-menu.active .navbar-links a {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation for links */
.navbar-menu.active .navbar-links li:nth-child(1) a { transition-delay: 0.1s; }
.navbar-menu.active .navbar-links li:nth-child(3) a { transition-delay: 0.2s; }
.navbar-menu.active .navbar-links li:nth-child(4) a { transition-delay: 0.25s; }
.navbar-menu.active .navbar-links li:nth-child(5) a { transition-delay: 0.3s; }

.menu-social {
  margin-top: auto;
  display: flex;
  gap: var(--spacing-md);
  padding-top: var(--spacing-lg);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s var(--transition-ease-smooth) 0.5s;
}

.navbar-menu.active .menu-social {
  opacity: 1;
  transform: translateY(0);
}

.menu-social a {
  font-size: 1.5rem;
  color: var(--color-text-primary);
  opacity: 0.6;
}

.menu-social a:hover {
  opacity: 1;
  color: var(--color-accent);
}

.navbar-links a:hover {
  color: var(--color-accent);
  padding-left: 10px;
}

.navbar-links a.router-link-exact-active {
  color: var(--color-accent);
  font-weight: 400;
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
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
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
