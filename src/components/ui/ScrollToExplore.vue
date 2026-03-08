<template>
  <div class="scroll-to-explore">
    <router-link to="/photos" class="explore-link">
      <div class="explore-content">
        <span class="explore-text">Explorer la galerie complète</span>
        <div class="explore-line-container">
          <div class="explore-line"></div>
          <i class="fas fa-chevron-down explore-icon"></i>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ScrollToExplore'
};
</script>

<style scoped>
.scroll-to-explore {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl) 0;
  margin-top: calc(var(--spacing-xl) * 2);
}

.explore-link {
  text-decoration: none;
  position: relative;
  display: inline-block;
}

.explore-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all var(--transition-speed) var(--transition-ease-smooth);
}

.explore-text {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  opacity: 0.9;
  transition: all var(--transition-speed) var(--transition-ease-smooth);
}

.explore-line-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: var(--spacing-xs);
}

.explore-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--color-accent), transparent);
  transition: height var(--transition-speed-slow) var(--transition-ease-smooth);
}

.explore-icon {
  font-size: 0.8rem;
  color: var(--color-accent);
  opacity: 0.7;
  animation: glide 2s infinite ease-in-out;
}

.explore-link:hover .explore-text {
  letter-spacing: 0.2em;
  opacity: 1;
}

.explore-link:hover .explore-line {
  height: 90px;
}

@keyframes glide {
  0% {
    transform: translateY(0);
    opacity: 0.2;
  }
  50% {
    transform: translateY(10px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 0.2;
  }
}

@media (max-width: 768px) {
  .explore-text {
    font-size: 1rem;
    letter-spacing: 0.1em;
  }
  
  .explore-line {
    height: 40px;
  }
  
  .explore-link:hover .explore-line {
    height: 60px;
  }
}
</style>
