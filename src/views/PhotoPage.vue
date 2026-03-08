<template>
  <div class="photos-page-container">
    <!-- Search Bar -->
    <div class="search-section">
      <TagSearchBar
        :keywords="allKeywords"
        v-model="searchTags"
        @search="handleSearch"
        @reset="handleResetAll"
      />
    </div>

    <!-- Result Count -->
    <div class="results-info">
      <span class="results-count">
        <i class="fas fa-images"></i>
        {{ filters.filteredPhotos.value.length }} photos trouvées
      </span>
    </div>

    <!-- Filter Panel -->
    <FilterPanel
      :locations="locations"
      :selectedLocation="filters.selectedLocation.value"
      :totalCount="enhancedPhotos.length"
      @update:selectedLocation="filters.setLocation"
    />

    <!-- Photo Grid -->
    <PhotoGrid :photos="pagedPhotos" @photo-click="openLightbox" />

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Précédent
      </button>
      <span class="page-info">Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Suivant
      </button>
    </div>

    <!-- No Results -->
    <div v-if="filters.filteredPhotos.value.length === 0" class="no-results">
      <i class="fas fa-search no-results-icon"></i>
      <p class="no-results-text">Aucune photo trouvée</p>
      <button class="reset-button" @click="handleResetAll">
        Réinitialiser les filtres
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import PhotoGrid from '../components/gallery/PhotoGrid.vue';
import TagSearchBar from '../components/search/TagSearchBar.vue';
import FilterPanel from '../components/search/FilterPanel.vue';
import { enhancePhotos, getTopLevelLocations, getSubLocations, getParentLocation, getAllKeywords } from '../utils/photo/photoUtils';
import { usePhotoFilters } from '../composables/usePhotoFilters';
import { usePagination } from '../composables/usePagination';

export default {
  name: 'PhotoPage',
  components: {
    PhotoGrid,
    TagSearchBar,
    FilterPanel
  },
  setup() {
    const store = useStore();

    // Data - Get and enhance photos
    const rawPhotos = computed(() => store.getters.allPhotos);
    const enhancedPhotos = computed(() => enhancePhotos(rawPhotos.value));

    // Filters - Use photo filters composable
    const filters = usePhotoFilters(enhancedPhotos);
    const searchTags = ref([]);

    // Location Logic - Get dynamic locations for filters
    const locations = computed(() => {
      const topLevel = getTopLevelLocations(rawPhotos.value);
      const selected = filters.selectedLocation.value;
      
      if (selected === 'Tous') return topLevel;
      
      let parent = selected;
      const maybeParent = getParentLocation(rawPhotos.value, selected);
      if (maybeParent) parent = maybeParent;
      
      const subLocs = getSubLocations(rawPhotos.value, parent);
      const combined = [...topLevel];
      
      subLocs.forEach(sub => {
        if (!combined.some(l => l.name === sub.name)) combined.push(sub);
      });
      
      return combined;
    });

    const allKeywords = computed(() => getAllKeywords(enhancedPhotos.value));

    // Pagination - Standardized logic
    const { 
      currentPage, 
      totalPages, 
      pagedItems: pagedPhotos, 
      nextPage, 
      prevPage, 
      resetPagination 
    } = usePagination(filters.filteredPhotos);

    // Watchers - Reset pagination when filters change
    watch(
      () => [filters.searchQuery.value, filters.selectedLocation.value],
      resetPagination
    );

    // Actions
    const handleSearch = (queryString) => filters.setSearchQuery(queryString);

    const openLightbox = (index) => {
      const globalIndex = (currentPage.value - 1) * 24 + index; // 24 is default pageSize
      store.commit('OPEN_LIGHTBOX', {
        photos: filters.filteredPhotos.value,
        index: globalIndex
      });
    };

    const handleResetAll = () => {
      searchTags.value = [];
      filters.resetFilters();
    };

    return {
      enhancedPhotos,
      locations,
      allKeywords,
      filters,
      searchTags,
      currentPage,
      totalPages,
      pagedPhotos,
      nextPage,
      prevPage,
      handleSearch,
      handleResetAll,
      openLightbox
    };
  }
};
</script>

<style scoped>
.photos-page-container {
  padding: var(--spacing-xl) var(--spacing-md);
  max-width: 1400px;
  margin: 0 auto;
}

.search-section {
  margin-bottom: var(--spacing-sm);
}

.results-info {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.results-count {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.no-results {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
}

.no-results-icon {
  font-size: 3rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.no-results-text {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.reset-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-accent);
  color: var(--color-bg);
  border-radius: 24px;
  font-weight: 500;
  transition: transform var(--transition-speed) ease,
              opacity var(--transition-speed) ease;
}

.reset-button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0 var(--spacing-lg);
}

.pagination-button {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 20px;
  background: var(--color-border);
  color: var(--color-text-primary);
  font-weight: 500;
  transition: transform var(--transition-speed) ease,
              opacity var(--transition-speed) ease;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  transform: translateY(-2px);
}

.page-info {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .photos-page-container {
    padding: var(--spacing-md);
  }
  
  .results-info {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: flex-start;
  }
}
</style>
