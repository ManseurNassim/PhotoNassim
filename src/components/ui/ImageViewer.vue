<template>
  <div v-if="isOpen" class="overlay" @click.self="closeViewer">
    <div
      class="image-viewer"
      v-touch:swipe.left="nextImage"
      v-touch:swipe.right="prevImage"
    >
      <button @click="prevImage" :disabled="currentIndex === 0">Précédent</button>
      <picture>
      <source :srcset="images[currentIndex].original" type="image/webp" />
        <img 
            :src="images[currentIndex].thumbnail" 
            :data-src="images[currentIndex].original" 
            class="lazyload"
            alt="Photo en plein écran" 
        />
      </picture>

      <button @click="nextImage" :disabled="currentIndex === images.length - 1">Suivant</button>
    </div>
  </div>
</template>

<script>
export default {
props: ["images", "isOpen", "currentIndex"],
methods: {
  closeViewer() {
    this.$emit("close");
  },
  nextImage() {
    this.$emit("update:currentIndex", this.currentIndex + 1);
  },
  prevImage() {
    this.$emit("update:currentIndex", this.currentIndex - 1);
  }
}
};
</script>

  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .image-viewer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .image-viewer img {
    max-width: 80%;
    max-height: 80%;
    border-radius: 5px;
  }
  
  .image-viewer button {
    background-color: white;
    border: none;
    padding: 10px;
    margin: 0 15px;
    cursor: pointer;
    font-size: 1em;
  }
  </style>
  