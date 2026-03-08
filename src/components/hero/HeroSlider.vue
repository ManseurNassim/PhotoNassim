<template>
  <div class="hero-slider">
    <transition-group name="fade" tag="div" class="slider-container">
      <div
        v-for="(photo, index) in slides"
        v-show="currentIndex === index"
        :key="photo.id"
        class="slide"
      >
        <div 
          class="slide-bg" 
          :style="{ backgroundImage: `url(${photo.src})` }"
        ></div>
        <div class="slide-overlay">
          <div class="slide-content">
            <h1 class="slide-title">Nassim Photo</h1>
            <p class="slide-subtitle">{{ photo.location || 'Découvrez mes meilleurs clichés' }}</p>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'HeroSlider',
  props: {
    photos: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 5000
    }
  },
  setup(props) {
    const slides = ref(props.photos);
    const currentIndex = ref(0);
    let timer = null;

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    };

    onMounted(() => {
      if (slides.value.length > 1) {
        timer = setInterval(nextSlide, props.interval);
      }
    });

    onUnmounted(() => {
      if (timer) clearInterval(timer);
    });

    return {
      slides,
      currentIndex
    };
  }
};
</script>

<style scoped>
.hero-slider {
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  animation: kenBurnsSlide 15s linear forwards;
  z-index: 1;
}

@keyframes kenBurnsSlide {
  from { transform: scale(1); }
  to { transform: scale(1.15); }
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.2) 0%,
    rgba(0,0,0,0.4) 50%,
    rgba(0,0,0,0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.slide-content {
  text-align: center;
  color: #ffffff;
  z-index: 10;
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(15, 15, 15, 0.3);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 12px;
  max-width: 90%;
  width: auto;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.slide-title {
  font-size: clamp(1.8rem, 8vw, 5rem);
  font-weight: 200;
  margin-bottom: var(--spacing-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1.1;
}

.slide-subtitle {
  font-size: clamp(0.75rem, 3vw, 1.2rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.9;
  color: #ffffff;
}

@media (min-width: 768px) {
  .slide-content {
    padding: var(--spacing-md) var(--spacing-lg);
    max-width: 80%;
  }
  
  .slide-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    letter-spacing: 0.15em;
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s var(--transition-ease-smooth);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
