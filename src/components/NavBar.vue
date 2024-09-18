<template>
  <nav class="navbar">
    <button class="navbar-burger" @click="toggleMenu">
      <!-- Icône du menu burger -->
      <span class="burger-icon" :class="{ 'burger-icon-active': isMenuActive }"></span>
    </button>
    <transition name="slide">
      <div v-if="isMenuActive" class="navbar-menu">
        <ul class="navbar-start">
          <li><router-link to="/" @click="closeMenu">Accueil</router-link></li>
          <li><router-link to="/photos" @click="closeMenu">Photos</router-link></li>
          <li><router-link to="/about" @click="closeMenu">À Propos</router-link></li>
          <li><router-link to="/equipment" @click="closeMenu">Matériel</router-link></li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuActive: false, // État du menu burger (ouvert/fermé)
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive; // Inverse l'état du menu
    },
    closeMenu() {
      this.isMenuActive = false; // Ferme le menu lorsque l'utilisateur clique sur un lien
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: transparent;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
}

/* Le bouton du menu burger */
.navbar-burger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  z-index: 3000;
}

/* Styles pour les barres du menu burger */
.burger-icon {
  width: 30px;
  height: 3px;
  background-color: #333; /* Noir par défaut */
  position: relative;
  transition: background-color 0.3s ease; /* Transition douce pour la couleur */
}

.burger-icon::before,
.burger-icon::after {
  content: '';
  width: 30px;
  height: 3px;
  background-color: #333; /* Noir par défaut */
  position: absolute;
  left: 0;
  transition: background-color 0.3s ease;
}

.burger-icon::before {
  top: -8px;
}

.burger-icon::after {
  top: 8px;
}

/* Quand le menu burger est actif (menu ouvert) */
.burger-icon-active,
.burger-icon-active::before,
.burger-icon-active::after {
  background-color: #fff !important; /* Blanc quand actif */
}

/* Mode sombre : le burger est blanc */
body.dark-theme .burger-icon,
body.dark-theme .burger-icon::before,
body.dark-theme .burger-icon::after {
  background-color: #fff !important; /* Blanc en mode sombre */
}

/* Menu burger en mode clair */
body.light-theme .burger-icon,
body.light-theme .burger-icon::before,
body.light-theme .burger-icon::after {
  background-color: #333; /* Noir en mode clair */
}

/* Styles pour la partie du menu */
.navbar-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #333;
  padding: 60px 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow-y: auto;
}

.navbar-start {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar-start li {
  margin: 15px 0;
  width: 100%;
  text-align: center;
}

.navbar-start a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.navbar-start a:hover {
  color: #c7ffbc;
  transform: scale(1.1);
}

.navbar-start a.router-link-exact-active {
  color: #42b983;
}

/* Animation de transition du menu */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
