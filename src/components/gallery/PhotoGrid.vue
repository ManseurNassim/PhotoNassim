<template>
  <div class="photos-grid">
    <PhotoItem
      v-for="(photo, index) in photos"
      :key="photo.id"
      :photo="photo"
      @click="$emit('photo-click', index)"
    />
  </div>
</template>

<script>
import PhotoItem from "./PhotoItem.vue";

export default {
  name: "PhotoGrid",
  components: {
    PhotoItem,
  },
  props: {
    photos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: ["photo-click"],
};
</script>

<style scoped>
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-lg) 0;
}

@media (min-width: 1200px) {
  .photos-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg);
  }
}
</style>
