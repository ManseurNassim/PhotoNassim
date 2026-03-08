<template>
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <NavBar :class="{ hidden: isHidden }" />
    
    <router-view v-slot="{ Component }">
      <transition name="fade-page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Global Lightbox -->
    <PhotoLightbox
      :isOpen="isLightboxOpen"
      :photos="lightboxPhotos"
      :initialIndex="lightboxIndex"
      @close="closeLightbox"
      @change-photo="changePhoto"
    />
  </div>
</template>

<script>
import NavBar from "./components/layout/NavBar.vue";
import PhotoLightbox from "./components/gallery/PhotoLightbox.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useScrollDirection } from "./composables/useScrollDirection";

export default {
  name: "App",
  components: {
    NavBar,
    PhotoLightbox,
  },
  setup() {
    const store = useStore();
    const isDarkTheme = ref(false);
    const { isHidden } = useScrollDirection();

    // Lightbox Global Logic
    const isLightboxOpen = computed(() => store.getters.isLightboxOpen);
    const lightboxPhotos = computed(() => store.getters.lightboxPhotos);
    const lightboxIndex = computed(() => store.getters.lightboxCurrentIndex);

    const closeLightbox = () => {
      store.commit("CLOSE_LIGHTBOX");
    };

    const changePhoto = (index) => {
      store.commit("SET_LIGHTBOX_INDEX", index);
    };

    // Basculer le thème (géré par ThemeToggleButton)
    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.body.classList.toggle("dark-theme", isDarkTheme.value);
    };

    return {
      isDarkTheme,
      toggleTheme,
      isHidden,
      // Lightbox
      isLightboxOpen,
      lightboxPhotos,
      lightboxIndex,
      closeLightbox,
      changePhoto,
    };
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  padding-top: 80px; /* Space for fixed navbar */
}

/* Page Transitions */
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
