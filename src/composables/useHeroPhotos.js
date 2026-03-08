import { computed } from 'vue';
import { useStore } from 'vuex';

/**
 * Composable for managing hero slider photo selection.
 * Handles filtering landscape images and prioritizing specific photos (e.g., giraffes).
 * 
 * @returns {Object} - { heroPhotos }
 */
export function useHeroPhotos() {
  const store = useStore();

  const heroPhotos = computed(() => {
    const all = store.getters.allPhotos;
    
    // 1. Identify priority photos (Giraffes in Kruger)
    const giraffes = all.filter(p => [146, 204].includes(p.id));
    
    // 2. Filter for high-impact landscape photos
    const others = [...all]
      .filter(p => {
        // Don't duplicate giraffes if they match the filter
        if ([146, 204].includes(p.id)) return false;
        
        const kws = (p.keywords || []).map(k => k.toLowerCase());
        
        // Strict landscape requirements: 
        // - NO portrait keyword
        // - At least one landscape-related keyword
        return !kws.includes('portrait') && (
          kws.includes('paysage') || 
          kws.includes('nature') || 
          kws.includes('ville') || 
          kws.includes('panorama')
        );
      })
      // 3. Sort by file size as a proxy for detail/quality
      .sort((a, b) => (b.size || 0) - (a.size || 0))
      // 4. Take the top 30 quality candidates
      .slice(0, 30)
      // 5. Pick 8 random ones for variety
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);

    // 6. Final shuffle of priority + random others
    return [...giraffes, ...others].sort(() => 0.5 - Math.random());
  });

  return {
    heroPhotos
  };
}
