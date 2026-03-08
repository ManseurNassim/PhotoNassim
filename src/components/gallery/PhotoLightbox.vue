<template>
  <div
    class="lightbox"
    v-if="isOpen"
    @click="close"
    @keydown.esc="close"
    tabindex="0"
    ref="lightbox"
  >
    <div class="lightbox-overlay"></div>

    <div class="lightbox-content">
      <button class="close-btn" @click="close" aria-label="Fermer">
        <i class="fas fa-times"></i>
      </button>

      <button
        class="nav-btn prev"
        @click.stop="prev"
        aria-label="Image précédente"
        v-if="hasMultiplePhotos && scale === 1"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <div
        class="image-container"
        @click.stop
        @wheel="handleWheel"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <img
          :src="currentPhoto.src"
          :alt="currentPhoto.title"
          class="lightbox-img"
          :style="{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            cursor: scale > 1 ? 'grab' : 'default',
          }"
          :class="{ gabbing: isDragging }"
        />

      </div>

      <button
        class="nav-btn next"
        @click.stop="next"
        aria-label="Image suivante"
        v-if="hasMultiplePhotos && scale === 1"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useZoomPan } from "../../composables/useZoomPan";

export default {
  name: "PhotoLightbox",
  props: {
    photos: {
      type: Array,
      required: true,
      default: () => [],
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close", "change-photo"],
  setup(props, { emit }) {
    const currentIndex = ref(props.initialIndex);
    const lightbox = ref(null);

    // Use the composable for Zoom & Pan logic
    const {
      scale,
      translate,
      isDragging,
      handleWheel: onWheel,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleTouchStart: onTouchStart,
      handleTouchMove: onTouchMove,
      handleTouchEnd: onTouchEnd,
    } = useZoomPan(currentIndex);

    // Wrapper to pass the lightbox ref or other context if needed
    const handleWheel = (e) => onWheel(e, lightbox);
    
    // Pass next/prev functions to handle navigation swipes when scale is 1
    const onTouchStartLocal = (e) => onTouchStart(e);
    const onTouchMoveLocal = (e) => onTouchMove(e);
    const onTouchEndLocal = (e) => onTouchEnd(e, { 
      next: () => emit('change-photo', (currentIndex.value + 1) % props.photos.length), 
      prev: () => emit('change-photo', (currentIndex.value - 1 + props.photos.length) % props.photos.length) 
    });

    // Synchroniser l'index interne avec la prop initialIndex
    watch(
      () => props.initialIndex,
      (newVal) => {
        currentIndex.value = newVal;
      },
    );

    const currentPhoto = computed(() => {
      if (!props.photos || props.photos.length === 0) return {};
      return props.photos[currentIndex.value];
    });

    const hasMultiplePhotos = computed(() => props.photos.length > 1);

    const close = () => {
      emit("close");
    };

    const next = () => {
      if (!hasMultiplePhotos.value) return;
      let newIndex = currentIndex.value + 1;
      if (newIndex >= props.photos.length) newIndex = 0;
      emit("change-photo", newIndex);
    };

    const prev = () => {
      if (!hasMultiplePhotos.value) return;
      let newIndex = currentIndex.value - 1;
      if (newIndex < 0) newIndex = props.photos.length - 1;
      emit("change-photo", newIndex);
    };

    // Keyboard navigation
    const handleKeydown = (e) => {
      if (!props.isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };



    // Prevent body scroll when open
    watch(
      () => props.isOpen,
      (isOpen) => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
          // Focus for keyboard events
          setTimeout(() => lightbox.value?.focus(), 100);
        } else {
          document.body.style.overflow = "";
        }
      },
    );

    onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    });

    return {
      currentIndex,
      currentPhoto,
      hasMultiplePhotos,
      close,
      next,
      prev,
      handleTouchStart: onTouchStartLocal,
      handleTouchMove: onTouchMoveLocal,
      handleTouchEnd: onTouchEndLocal,
      lightbox,
      handleWheel,
      // Zoom & Pan (from composable)
      scale,
      translate,
      isDragging,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
    };
  },
};
</script>

<style scoped>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200000; /* Plus haut que ThemeToggle (100000) */
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}

.lightbox-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
}

.lightbox-content {
  position: relative;
  z-index: 2001;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  position: relative;
  max-width: 90%;
  max-height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}



/* Controls */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 20px;
  cursor: pointer;
  transition: all var(--transition-speed) var(--transition-ease-smooth);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  z-index: 10; /* Ensure buttons stay above the image */
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn.prev {
  left: 20px;
}
.nav-btn.next {
  right: 20px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 200002; /* Encore plus haut */
  transition: transform var(--transition-speed) var(--transition-ease-smooth);
  padding: 10px;
}

.close-btn:hover {
  transform: rotate(90deg);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .nav-btn {
    padding: 10px;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  .nav-btn.prev {
    left: 10px;
  }
  .nav-btn.next {
    right: 10px;
  }

  .lightbox-img {
    max-height: 70vh;
  }
}

.lightbox-img {
  transition: transform 0.25s cubic-bezier(0.2, 0, 0.2, 1); /* Plus fluide */
  /* Empêcher la sélection de l'image */
  user-select: none;
  -webkit-user-drag: none;
}

.lightbox-img.gabbing {
  cursor: grabbing !important;
  transition: none; /* Pas de transition pendant le drag pour plus de réactivité */
}
</style>
