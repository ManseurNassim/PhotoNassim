<template>
  <div class="filter-panel">
    <div class="filter-header">
      <h3 class="filter-title">
        <i class="fas fa-map-marker-alt"></i>
        Filtrer par lieu
      </h3>
    </div>

    <div class="filter-chips">
      <FilterChip
        label="Tous"
        :count="totalCount"
        :isActive="selectedLocation === 'Tous'"
        @click="handleSelect('Tous')"
      />
      <FilterChip
        v-for="location in locations"
        :key="location.name"
        :label="location.name"
        :count="location.count"
        :isActive="selectedLocation === location.name"
        @click="handleSelect(location.name)"
      />
    </div>
  </div>
</template>

<script>
import FilterChip from './FilterChip.vue';

export default {
  name: 'FilterPanel',
  components: {
    FilterChip
  },
  props: {
    locations: {
      type: Array,
      required: true
    },
    selectedLocation: {
      type: String,
      default: 'Tous'
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  emits: ['update:selectedLocation'],
  setup(props, { emit }) {
    function handleSelect(location) {
      emit('update:selectedLocation', location);
    }

    function handleReset() {
      emit('update:selectedLocation', 'Tous');
    }

    return {
      handleSelect,
      handleReset
    };
  }
};
</script>

<style scoped>
.filter-panel {
  margin: var(--spacing-lg) 0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.filter-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin: 0;
}

.filter-title i {
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

@media (max-width: 768px) {
  .filter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .filter-chips {
    width: 100%;
  }
}
</style>
