import { ref, watch } from 'vue';

export function useZoomPan(currentIndex) {
  const scale = ref(1);
  const translate = ref({ x: 0, y: 0 });
  const isDragging = ref(false);
  const startDrag = ref({ x: 0, y: 0 });

  // Reset zoom and pan on photo change
  watch(currentIndex, () => {
    scale.value = 1;
    translate.value = { x: 0, y: 0 };
  });

  const handleWheel = (e, containerRef) => {
    e.preventDefault();

    // Need access to the DOM element to calculate rect
    // We can pass the ref or find it. Passing the container element is better.
    const img = containerRef.value?.querySelector('.lightbox-img');
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const zoomSpeed = 0.3;
    const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
    const newScale = Math.max(1, Math.min(4, scale.value + delta));

    if (newScale === scale.value) return;

    const ratio = newScale / scale.value;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const xFromCenter = mouseX - centerX;
    const yFromCenter = mouseY - centerY;

    translate.value.x -= xFromCenter * (ratio - 1);
    translate.value.y -= yFromCenter * (ratio - 1);

    scale.value = newScale;

    // Re-center if fully zoomed out
    if (newScale === 1) {
      translate.value = { x: 0, y: 0 };
    }
  };

  // Touch handling
  const touchStart = ref({ x: 0, y: 0, yStart: 0 });
  const lastTouchDist = ref(0);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.value = true;
      touchStart.value = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY,
        yStart: e.touches[0].clientY 
      };
      startDrag.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      // For pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchDist.value = dist;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging.value) {
      if (scale.value > 1) {
        // Panning when zoomed
        const dx = e.touches[0].clientX - startDrag.value.x;
        const dy = e.touches[0].clientY - startDrag.value.y;
        translate.value.x += dx;
        translate.value.y += dy;
        startDrag.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    } else if (e.touches.length === 2) {
      // Pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      const ratio = dist / lastTouchDist.value;
      const newScale = Math.max(1, Math.min(4, scale.value * ratio));
      
      if (newScale !== scale.value) {
        scale.value = newScale;
        if (newScale === 1) translate.value = { x: 0, y: 0 };
      }
      lastTouchDist.value = dist;
    }
  };

  const handleTouchEnd = (e, nav) => {
    isDragging.value = false;
    
    if (scale.value === 1 && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStart.value.x;
      const dy = e.changedTouches[0].clientY - touchStart.value.y;
      
      // Swipe navigation
      if (Math.abs(dx) > 50 && Math.abs(dy) < 100) {
        if (dx > 0) nav?.prev();
        else nav?.next();
      }
    }
  };

  // Mouse handling
  const handleMouseDown = (e) => {
    if (scale.value > 1) {
      isDragging.value = true;
      startDrag.value = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.value) return;
    const dx = e.clientX - startDrag.value.x;
    const dy = e.clientY - startDrag.value.y;

    translate.value.x += dx;
    translate.value.y += dy;

    startDrag.value = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.value = false;
  };

  return {
    scale,
    translate,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}
