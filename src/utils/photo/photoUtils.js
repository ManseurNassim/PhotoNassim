/**
 * Photo Utilities & Transformations
 * Centralizes all data processing for the photo gallery.
 */

// Known locations in the photo collection
const KNOWN_LOCATIONS = {
  'alger': 'Alger',
  'algiers': 'Alger',
  'oran': 'Oran',
  'kabylie': 'Kabylie',
  'kabyle': 'Kabylie',
  'tizi': 'Kabylie',
  'constantine': 'Constantine',
  'annaba': 'Annaba',
  'tlemcen': 'Tlemcen',
  'béjaïa': 'Béjaïa',
  'bejaia': 'Béjaïa',
  'sétif': 'Sétif',
  'setif': 'Sétif'
};

const IGNORED_LOCATIONS = ['inconnu', 'inconnue', 'grèce', 'seine-maritime', 'seine maritime'];

/**
 * Extract location from keywords array.
 */
export function extractLocation(keywords) {
  if (!keywords || !Array.isArray(keywords)) return null;
  
  for (const keyword of keywords) {
    const normalized = keyword.toLowerCase().trim();
    if (KNOWN_LOCATIONS[normalized]) {
      return KNOWN_LOCATIONS[normalized];
    }
  }
  
  return null;
}

/**
 * Get Top Level locations (Countries/Regions at the end of strings).
 */
export function getTopLevelLocations(photos) {
  const counts = {};
  photos.forEach(photo => {
    const fullLocation = photo.location || extractLocation(photo.keywords);
    if (fullLocation) {
      const segments = fullLocation.split(',').map(s => s.trim()).filter(s => !IGNORED_LOCATIONS.includes(s.toLowerCase()));
      const topLevel = segments[segments.length - 1];
      if (topLevel) {
        counts[topLevel] = (counts[topLevel] || 0) + 1;
      }
    }
  });

  return Object.entries(counts)
    .filter(([, count]) => count >= 2)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get Sub Locations for a specific parent.
 */
export function getSubLocations(photos, parentName) {
  if (!parentName || parentName === 'Tous') return [];
  
  const counts = {};
  photos.forEach(photo => {
    const fullLocation = photo.location || extractLocation(photo.keywords);
    if (fullLocation && fullLocation.includes(parentName)) {
      const segments = fullLocation.split(',').map(s => s.trim()).filter(s => !IGNORED_LOCATIONS.includes(s.toLowerCase()));
      if (segments.includes(parentName)) {
        segments.forEach(seg => {
          if (seg !== parentName) {
            counts[seg] = (counts[seg] || 0) + 1;
          }
        });
      }
    }
  });

  return Object.entries(counts)
    .filter(([, count]) => count >= 2)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Find parent location for a sub-location.
 */
export function getParentLocation(photos, locationName) {
  if (!locationName || locationName === 'Tous') return null;
  
  const potentialParents = {};
  photos.forEach(photo => {
    const fullLocation = photo.location || extractLocation(photo.keywords);
    if (fullLocation && fullLocation.includes(locationName)) {
      const segments = fullLocation.split(',').map(s => s.trim());
      if (segments.includes(locationName)) {
        const country = segments[segments.length - 1];
        if (country !== locationName) {
          potentialParents[country] = (potentialParents[country] || 0) + 1;
        }
      }
    }
  });

  const sorted = Object.entries(potentialParents).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : null;
}

/**
 * Normalize a keyword for search and indexing.
 * Removes accents and converts to lowercase.
 */
export function normalizeKeyword(keyword) {
  if (!keyword || typeof keyword !== 'string') return '';
  return keyword
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Enhance a single photo object with computed properties.
 */
export function enhancePhoto(photo) {
  const normalizedKeywords = (photo.keywords || [])
    .map(normalizeKeyword)
    .filter(k => k.length > 0);

  return {
    ...photo,
    location: photo.location || extractLocation(photo.keywords),
    category: determineCategory(photo.keywords),
    displayTitle: photo.title || `Photo ${photo.id}`,
    normalizedKeywords: Array.from(new Set(normalizedKeywords)),
    keywordIndex: normalizedKeywords.join(' ')
  };
}

/**
 * Determine photo category based on keywords.
 */
export function determineCategory(keywords) {
  if (!keywords || !Array.isArray(keywords)) return 'autre';
  
  const keywordStr = keywords.join(' ').toLowerCase();
  
  if (keywordStr.includes('portrait')) return 'portrait';
  if (keywordStr.includes('paysage') || keywordStr.includes('montagne') || keywordStr.includes('mer')) {
    return 'paysage';
  }
  if (keywordStr.includes('architecture') || keywordStr.includes('bâtiment') || keywordStr.includes('monument')) {
    return 'architecture';
  }
  if (keywordStr.includes('nuit') || keywordStr.includes('soir')) return 'nuit';
  
  return 'autre';
}

/**
 * Enhance and sort a collection of photos.
 */
export function enhancePhotos(photos) {
  if (!photos) return [];
  return photos
    .map(enhancePhoto)
    .sort((a, b) => {
      const dateA = new Date(a.uploadedAt || 0);
      const dateB = new Date(b.uploadedAt || 0);
      return dateB - dateA;
    });
}

/**
 * Get all unique keywords from photos (for autocomplete).
 */
export function getAllKeywords(photos) {
  const keywordSet = new Set();

  photos.forEach(photo => {
    const sourceKeywords = Array.isArray(photo.normalizedKeywords)
      ? photo.normalizedKeywords
      : photo.keywords;

    if (sourceKeywords && Array.isArray(sourceKeywords)) {
      sourceKeywords.forEach(keyword => {
        const normalized = typeof keyword === 'string' ? keyword.trim().toLowerCase() : '';
        if (normalized.length > 0) {
          keywordSet.add(normalized);
        }
      });
    }
  });

  return Array.from(keywordSet).sort();
}

/**
 * Filter photos by search query (keywords).
 * Supports multiple keywords separated by commas.
 */
export function filterByKeyword(photos, query) {
  if (!query || query.trim() === '') return photos;
  
  const keywords = query
    .split(',')
    .map(normalizeKeyword)
    .filter(k => k.length > 0);
  
  if (keywords.length === 0) return photos;
  
  return photos.filter(photo => {
    const normalized = photo.normalizedKeywords || [];
    if (normalized.length === 0) return false;

    return keywords.every(searchTerm =>
      normalized.some(keyword => keyword.includes(searchTerm))
    );
  });
}

/**
 * Filter photos by location.
 */
export function filterByLocation(photos, location) {
  if (!location || location === 'Tous') return photos;
  
  return photos.filter(photo => {
    const photoLocation = photo.location;
    if (!photoLocation) return false;
    
    const segments = photoLocation.split(',').map(s => s.trim());
    return segments.includes(location);
  });
}

/**
 * Combined filter: keyword + location.
 */
export function filterPhotos(photos, keyword = '', location = 'Tous') {
  let filtered = photos;
  
  if (keyword && keyword.trim() !== '') {
    filtered = filterByKeyword(filtered, keyword);
  }
  
  if (location && location !== 'Tous') {
    filtered = filterByLocation(filtered, location);
  }
  
  return filtered;
}
