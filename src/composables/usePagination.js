import { ref, computed } from 'vue';

/**
 * Standardized pagination logic.
 * 
 * @param {Array|Ref} items - Array of items to paginate
 * @param {number} initialPageSize - Default items per page
 * @returns {Object} - Pagination state and methods
 */
export function usePagination(items, initialPageSize = 24) {
  const currentPage = ref(1);
  const pageSize = ref(initialPageSize);

  const totalItems = computed(() => {
    const list = typeof items === 'function' ? items() : (items.value || items);
    return list.length;
  });

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(totalItems.value / pageSize.value));
  });

  const pagedItems = computed(() => {
    const list = typeof items === 'function' ? items() : (items.value || items);
    const start = (currentPage.value - 1) * pageSize.value;
    return list.slice(start, start + pageSize.value);
  });

  function goToPage(page) {
    const safePage = Math.min(Math.max(1, page), totalPages.value);
    currentPage.value = safePage;
  }

  function nextPage() {
    goToPage(currentPage.value + 1);
  }

  function prevPage() {
    goToPage(currentPage.value - 1);
  }

  function resetPagination() {
    currentPage.value = 1;
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    pagedItems,
    goToPage,
    nextPage,
    prevPage,
    resetPagination
  };
}
