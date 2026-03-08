<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">À Propos de Moi</h1>
    </div>

    <div class="two-column about-content">
      <div class="profile-section">
        <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291772/portfolio/assets/nassim-profile.jpg" alt="Photo de Nassim Manseur" class="profile-photo" loading="lazy" />
      </div>
      
      <div class="text-content">
        <p>
          Je suis Nassim Manseur, un étudiant en informatique et passionné de la photographie. 
          J'aime beaucoup la photo et j'ai donc décidé de partager sur ce site les clichés avec 
          leurs qualités originelles, que je prends durant mes voyages.
        </p>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">Comment j'édite mes images</h2>
      
      <div class="editing-examples">
        <!-- Premier exemple -->
        <div class="editing-row">
          <div class="editing-step">
            <div class="step-label">Photo Originale</div>
            <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291773/portfolio/assets/exemple1_1.jpg" alt="Photo originale 1" loading="lazy" />
          </div>
          <div class="editing-step">
            <div class="step-label">Photo Recadrée</div>
            <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291773/portfolio/assets/exemple1_2.jpg" alt="Photo recadrée 1" loading="lazy" />
          </div>
          <div class="editing-step">
            <div class="step-label">Photo Finale</div>
            <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291774/portfolio/assets/exemple1_3.jpg" alt="Photo finale 1" loading="lazy" />
          </div>
        </div>

        <!-- Deuxième exemple -->
        <div class="editing-row">
          <div class="editing-step">
            <div class="step-label">Photo Originale</div>
            <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291775/portfolio/assets/exemple2_1.jpg" alt="Photo originale 2" loading="lazy" />
          </div>
          <div class="editing-step">
            <div class="step-label">Photo Recadrée</div>
            <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291776/portfolio/assets/exemple2_2.jpg" alt="Photo recadrée 2" loading="lazy" />
          </div>
          <div class="editing-step">
            <div class="step-label">Photo Finale</div>
            <img src="https://res.cloudinary.com/ddcsplrer/image/upload/v1772291777/portfolio/assets/exemple2_3.jpg" alt="Photo finale 2" loading="lazy" />
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">Contactez-moi</h2>
      <p class="text-content">Pour en savoir plus ou me contacter, vous pouvez me trouver sur Instagram.</p>
      <div class="social-links">
        <a href="https://www.instagram.com/n4ssimm_" target="_blank" class="social-link">
          <i class="fab fa-instagram"></i> Instagram
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>

<style scoped>
.about-content {
  margin-bottom: var(--spacing-xl);
  align-items: center;
}

.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-photo {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: var(--shadow-medium);
  transition: transform var(--transition-speed) ease;
}

.profile-photo:hover {
  transform: scale(1.05);
}

.editing-examples {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.editing-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.editing-step {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.step-label {
  font-weight: 500;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.editing-step img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: var(--shadow-subtle);
  transition: box-shadow var(--transition-speed) ease,
              transform var(--transition-speed) ease;
}

.editing-step img:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-4px);
}

.social-links {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-md);
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border);
  border-radius: 4px;
  font-weight: 500;
  transition: all var(--transition-speed) ease;
}

.social-link:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
  background: var(--color-border);
}

@media (max-width: 768px) {
  .editing-row {
    grid-template-columns: 1fr;
  }
  
  .profile-photo {
    width: 180px;
    height: 180px;
  }
}
</style>
