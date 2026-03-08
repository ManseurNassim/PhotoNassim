<template>
  <div class="home-container">
    <HeroSlider :photos="heroPhotos" />
    
    <!-- Call to Action -->
    <ScrollToExplore />
  </div>
</template>

<script>
import HeroSlider from "../components/hero/HeroSlider.vue";
import ScrollToExplore from "../components/ui/ScrollToExplore.vue";
import { useHeroPhotos } from "../composables/useHeroPhotos";

export default {
  name: "HomePage",
  components: {
    HeroSlider,
    ScrollToExplore
  },
  setup() {
    const { heroPhotos } = useHeroPhotos();

    return {
      heroPhotos,
    };
  },
};
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}
</style>
