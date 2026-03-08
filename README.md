# PhotoNassim Portfolio

Bienvenue sur le dépôt de mon portfolio de photographie personnel. Ce projet est conçu pour présenter mes clichés de voyage en haute résolution avec une expérience utilisateur fluide et immersive.

## 🚀 Fonctionnalités

- **Galerie Dynamique** : Affichage des photos sous forme de grille optimisée (Masonry) et de showcase.
- **Hero Slider** : Page d'accueil immersive avec animations Ken Burns fluides.
- **Filtrage Avancé** : Recherche par mots-clés et filtrage par lieu (Pays/Région).
- **Visionneuse HD** : Lightbox interactive avec support du zoom et du déplacement sur mobile.
- **Thème Sombre/Clair** : Interface adaptative pour un confort visuel optimal.

## 🛠️ Technologies Utilisées

Ce projet repose sur une architecture moderne en Vue.js :

- **Vue 3 (Composition API)** : Pour une logique modulaire et réactive.
- **Vuex** : Gestion centralisée de l'état de l'application (lightbox, filtres).
- **Vue Router** : Navigation fluide entre les pages Accueil, Photos, À propos et Matériel.
- **Scripts de Traitement** : Automatisation de l'upload vers Cloudinary et synchronisation des données.
- **IA (Génération de Tags)** : Utilisation de l'IA pour l'analyse automatique des images et la génération de mots-clés lors de l'import.
- **Cloudinary** : Hébergement et optimisation dynamique des assets visuels.

## 📖 Fonctionnement

Le site consomme un fichier `photos.json` généré automatiquement par des scripts internes. Ces scripts s'occupent de transformer les images brutes, de les uploader sur le cloud et de créer l'indexation nécessaire pour le moteur de recherche interne du site.

---

© 2024-2025 Nassim Manseur
