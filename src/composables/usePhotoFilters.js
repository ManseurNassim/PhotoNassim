/**
 * Photo Filters Composable
 * 
 * Centralized logic for filtering photos by keyword and location.
 * Manages filter state and provides computed filtered results.
 */

import { ref, computed } from 'vue';
import { filterPhotos } from '../utils/photo/photoUtils';

export function usePhotoFilters(photos) {
  const searchQuery = ref('');
  const selectedLocation = ref('Tous');

  // Computed filtered photos
  const filteredPhotos = computed(() => {
    return filterPhotos(
      photos.value,
      searchQuery.value,
      selectedLocation.value
    );
  });

  // Set search query
  function setSearchQuery(query) {
    searchQuery.value = query;
  }

  // Set location filter
  function setLocation(location) {
    selectedLocation.value = location;
  }

  // Reset all filters
  function resetFilters() {
    searchQuery.value = '';
    selectedLocation.value = 'Tous';
  }

  // Check if any filter is active
  const hasActiveFilters = computed(() => {
    return searchQuery.value.trim() !== '' || selectedLocation.value !== 'Tous';
  });

  return {
    searchQuery,
    selectedLocation,
    filteredPhotos,
    setSearchQuery,
    setLocation,
    resetFilters,
    hasActiveFilters
  };
}
