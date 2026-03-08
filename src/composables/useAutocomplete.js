/**
 * Autocomplete Composable
 * 
 * Provides autocomplete functionality for search inputs.
 * Reusable across different search contexts.
 */

import { ref, computed } from 'vue';

export function useAutocomplete(items, maxSuggestions = 5) {
  const query = ref('');
  const selectedIndex = ref(-1);
  const isOpen = ref(false);

  // Filter suggestions based on query
  const suggestions = computed(() => {
    if (!query.value || query.value.trim().length < 2) {
      return [];
    }

    const normalize = (str) => 
      str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
    const searchTerm = normalize(query.value);
    const filtered = items.value.filter(item =>
      normalize(item).includes(searchTerm)
    );

    return filtered.slice(0, maxSuggestions);
  });

  // Show dropdown if there are suggestions
  const showSuggestions = computed(() => {
    return isOpen.value && suggestions.value.length > 0;
  });

  // Select a suggestion
  function selectSuggestion(suggestion) {
    query.value = suggestion;
    isOpen.value = false;
    selectedIndex.value = -1;
  }

  // Navigate suggestions with keyboard
  function navigateUp() {
    if (selectedIndex.value > 0) {
      selectedIndex.value--;
    }
  }

  function navigateDown() {
    if (selectedIndex.value < suggestions.value.length - 1) {
      selectedIndex.value++;
    }
  }

  function selectCurrent() {
    if (selectedIndex.value >= 0 && selectedIndex.value < suggestions.value.length) {
      selectSuggestion(suggestions.value[selectedIndex.value]);
    }
  }

  // Open/close dropdown
  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
    selectedIndex.value = -1;
  }

  // Reset
  function reset() {
    query.value = '';
    close();
  }

  return {
    query,
    suggestions,
    showSuggestions,
    selectedIndex,
    selectSuggestion,
    navigateUp,
    navigateDown,
    selectCurrent,
    open,
    close,
    reset
  };
}
