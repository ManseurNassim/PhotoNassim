<template>
  <div class="photo-item" :class="{ 'is-featured': isFeatured }" @click="$emit('click')">
    <img
      :data-src="photo.thumbnailSrc"
      :alt="photo.title"
      class="photo-thumbnail lazyload"
      loading="lazy"
    />
    <div class="photo-overlay">
      <i class="fas fa-search-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoItem",
  props: {
    photo: {
      type: Object,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
};
</script>

<style scoped>
.photo-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--color-bg);
  aspect-ratio: 1;
  box-shadow: var(--shadow-subtle);
  transition: box-shadow var(--transition-speed) var(--transition-ease-smooth),
              transform var(--transition-speed) var(--transition-ease-smooth);
}

.photo-item.is-featured {
  aspect-ratio: auto;
  height: 100%;
}

.photo-item:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-8px);
}

.photo-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--transition-ease-smooth);
  display: block;
}

.photo-item:hover .photo-thumbnail {
  transform: scale(1.1);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity var(--transition-speed) var(--transition-ease-smooth);
}

.photo-item:hover .photo-overlay {
  opacity: 1;
}

.photo-overlay i {
  color: white;
  font-size: 2rem;
  transform: scale(0.5);
  transition: transform var(--transition-speed) var(--transition-ease-smooth);
}

.photo-item:hover .photo-overlay i {
  transform: scale(1);
}
</style>
