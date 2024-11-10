<template>
    <div v-if="isOpen" class="overlay" @click.self="closeViewer">
      <div
        class="image-viewer"
        v-touch:swipe.left="nextImage"
        v-touch:swipe.right="prevImage"
      >
        <button @click="prevImage" :disabled="currentIndex === 0">Précédent</button>
        <img :src="images[currentIndex].src" :alt="images[currentIndex].title" />
        <button @click="nextImage" :disabled="currentIndex === images.length - 1">Suivant</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      images: {
        type: Array,
        required: true
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        currentIndex: this.initialIndex,
        isOpen: true
      };
    },
    methods: {
      closeViewer() {
        this.isOpen = false;
        this.$emit("close");
      },
      nextImage() {
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
        }
      },
      prevImage() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
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
  