import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Composable to track scroll direction and manage visibility
 * @returns {Object} { isHidden }
 */
export function useScrollDirection() {
  const lastScrollTop = ref(0);
  const isHidden = ref(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only activate in portrait mode (typical mobile behavior)
    if (window.innerHeight > window.innerWidth) {
      if (scrollTop > lastScrollTop.value && scrollTop > 50) {
        // Scrolling down
        isHidden.value = true;
      } else {
        // Scrolling up
        isHidden.value = false;
      }
    } else {
      // Desktop: always show
      isHidden.value = false;
    }
    
    lastScrollTop.value = scrollTop;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    isHidden
  };
}
