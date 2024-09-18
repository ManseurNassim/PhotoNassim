<template>
  <div class="about-page">
    <h1>À Propos de Moi</h1>
    <!-- Photo de profil -->
    <img src="nassim.jpg" alt="Photo de Nassim Manseur" class="profile-photo" />

    <!-- Biographie détaillée -->
    <p>
      Je suis Nassim Manseur, un étudiant en informatique et passioné de la photographie. J'aime beaucoup la photo et j'ai donc décidé de partager sur se site les clichés que je me prend durant mes voyages.
    </p><!-- Section d'édition des images -->
    <h2>Comment j'édite mes images</h2>
    <div class="editing-steps-container">
      <!-- Premier ensemble d'images -->
      <div class="editing-process">
        <div class="editing-set">
          <div class="step">
            <div class="step-title">Photo Originale</div>
            <img src="/images/exemple1_1.jpg" alt="Photo originale 1" class="editing-photo" />
          </div>
          <div class="step">
            <div class="step-title">Photo Recadrée</div>
            <img src="/images/exemple1_2.jpg" alt="Photo recadrée 1" class="editing-photo" />
          </div>
          <div class="step">
            <div class="step-title">Photo Finale</div>
            <img src="/images/exemple1_3.jpg" alt="Photo finale 1" class="editing-photo" />
          </div>
        </div>

        <!-- Deuxième ensemble d'images -->
        <div class="editing-set">
          <div class="step">
            <div class="step-title">Photo Originale</div>
            <img src="/images/exemple2_1.jpg" alt="Photo originale 2" class="editing-photo" />
          </div>
          <div class="step">
            <div class="step-title">Photo Recadrée</div>
            <img src="/images/exemple2_2.jpg" alt="Photo recadrée 2" class="editing-photo" />
          </div>
          <div class="step">
            <div class="step-title">Photo Finale</div>
            <img src="/images/exemple2_3.jpg" alt="Photo finale 2" class="editing-photo" />
          </div>
        </div>
      </div>
    </div>

    <!-- Section de contact -->
    <h2>Contactez-moi</h2>
    <p>Pour en savoir plus ou me contacter, vous pouvez me trouver sur Instagram.</p>
    <div class="social-links">
      <a href="https://www.instagram.com/n4ssimm_" target="_blank">Instagram</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark-theme .about-page {
  background-color: #333;
  color: #f0f0f0;
}

.profile-photo {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.profile-photo:hover {
  transform: scale(1.1);
}

.editing-steps-container {
  margin: 20px 0;
}

.editing-steps {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.step-title {
  font-weight: bold;
  color: #333;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 10px;
}

.dark-theme .step-title {
  color: #f0f0f0;
}

.editing-process {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 20px 0;
}

.editing-set {
  display: flex;
  justify-content: space-around;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
}

.editing-photo {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.editing-photo:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.social-links {
  margin: 20px 0;
}

.social-links a {
  margin: 0 10px;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.social-links a:hover {
  text-decoration: underline;
  color: #2a7a59;
}

h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 15px;
}

.dark-theme h1 {
  color: #f0f0f0;
}

h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 1.8em;
  color: #42b983;
  margin-bottom: 10px;
}

.dark-theme h2 {
  color: #76d7c4;
}

p {
  font-family: 'Arial', sans-serif;
  font-size: 1.2em;
  color: #555;
  line-height: 1.6;
}

.dark-theme p {
  color: #ddd;
}

/* Styles pour mobile */
@media (max-width: 768px) {
  .editing-steps {
    flex-direction: column;
  }

  .editing-set {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .editing-set:first-of-type {
    margin-bottom: 40px; /* Espace supplémentaire après les trois premières images */
  }

  .editing-photo {
    width: 100%;
    height: auto; /* Ajuster la hauteur automatiquement pour maintenir le ratio */
  }

  .profile-photo {
    width: 150px;
    height: 150px;
  }

  .step {
    width: 100%;
  }
}
</style>
