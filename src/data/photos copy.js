const photos = [
  {
    "id": 1,
    "title": "Coucher de soleil sur la plage",
    "src": "/images/photo-01.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-01.jpg",
    "keywords": ["coucher de soleil", "plage", "mer"]
  },
  {
    "id": 2,
    "title": "Forêt enneigée",
    "src": "/images/photo-02.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-02.jpg",
    "keywords": ["forêt", "neige", "hiver"]
  },
  {
    "id": 3,
    "title": "Ville de nuit",
    "src": "/images/photo-03.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-03.jpg",
    "keywords": ["ville", "nuit", "lumières"]
  },
  {
    "id": 4,
    "title": "Soleil sur la plage",
    "src": "/images/photo-04.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-04.jpg",
    "keywords": ["coucher de soleil", "plage", "mer"]
  },
  {
    "id": 5,
    "title": "Plage",
    "src": "/images/photo-05.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-05.jpg",
    "keywords": ["coucher de soleil", "plage", "mer"],
    "isBest":true
  },
  {
    "id": 6,
    "title": "Soleil",
    "src": "/images/photo-06.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-06.jpg",
    "keywords": ["coucher de soleil", "plage", "mer"]
  },
  {
    "id": 7,
    "title": "Montagne au lever du soleil",
    "src": "/images/photo-07.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-07.jpg",
    "keywords": ["montagne", "lever du soleil", "nature"]
  },
  {
    "id": 8,
    "title": "Rivière en automne",
    "src": "/images/photo-08.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-08.jpg",
    "keywords": ["rivière", "automne", "feuilles"],
    "isBest":true
  },
  {
    "id": 9,
    "title": "Prairie fleurie",
    "src": "/images/photo-09.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-09.jpg",
    "keywords": ["prairie", "fleurs", "été"],
    "isBest":true
  },
  {
    "id": 10,
    "title": "Neige en montagne",
    "src": "/images/photo-10.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-10.jpg",
    "keywords": ["neige", "montagne", "hiver"]
  },
  {
    "id": 11,
    "title": "Plage au crépuscule",
    "src": "/images/photo-11.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-11.jpg",
    "keywords": ["plage", "crépuscule", "mer"]
  },
  {
    "id": 12,
    "title": "Vieux phare",
    "src": "/images/photo-12.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-12.jpg",
    "keywords": ["phare", "océan", "architecture"]
  },
  {
    "id": 13,
    "title": "Cascades d'eau",
    "src": "/images/photo-13.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-13.jpg",
    "keywords": ["cascades", "eau", "nature"]
  },
  {
    "id": 14,
    "title": "Dunes de sable",
    "src": "/images/photo-14.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-14.jpg",
    "keywords": ["dunes", "sable", "désert"],
    "isBest":true
  },
  {
    "id": 15,
    "title": "Vue depuis un sommet",
    "src": "/images/photo-15.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-15.jpg",
    "keywords": ["sommet", "vue", "paysage"],
    "isBest":true
  },
  {
    "id": 16,
    "title": "Chemin dans la forêt",
    "src": "/images/photo-16.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-16.jpg",
    "keywords": ["chemin", "forêt", "nature"]
  },
  {
    "id": 17,
    "title": "Pont suspendu",
    "src": "/images/photo-17.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-17.jpg",
    "keywords": ["pont", "suspendu", "architecture"],
    "isBest":true
  },
  {
    "id": 18,
    "title": "Lever du soleil sur le lac",
    "src": "/images/photo-18.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-18.jpg",
    "keywords": ["lever du soleil", "lac", "réflexion"]
  },
  {
    "id": 19,
    "title": "Champ de lavande",
    "src": "/images/photo-19.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-19.jpg",
    "keywords": ["lavande", "champ", "été"],
    "isBest":true
  },
  {
    "id": 20,
    "title": "Arche naturelle",
    "src": "/images/photo-20.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-20.jpg",
    "keywords": ["arche", "naturelle", "rocher"]
  },
  {
    "id": 21,
    "title": "Vallée verdoyante",
    "src": "/images/photo-21.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-21.jpg",
    "keywords": ["vallée", "verdoyant", "nature"]
  },
  {
    "id": 22,
    "title": "Chutes d'eau tropicales",
    "src": "/images/photo-22.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-22.jpg",
    "keywords": ["chutes d'eau", "tropical", "nature"],
    "isBest":true
  },
  {
    "id": 23,
    "title": "Ville ancienne",
    "src": "/images/photo-23.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-23.jpg",
    "keywords": ["ville", "ancienne", "architecture"]
  },
  {
    "id": 24,
    "title": "Lac gelé",
    "src": "/images/photo-24.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-24.jpg",
    "keywords": ["lac", "gelé", "hiver"]
  },
  {
    "id": 25,
    "title": "Soleil à travers les arbres",
    "src": "/images/photo-25.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-25.jpg",
    "keywords": ["soleil", "arbres", "nature"]
  },
  {
    "id": 26,
    "title": "Vue de la mer",
    "src": "/images/photo-26.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-26.jpg",
    "keywords": ["mer", "vue", "horizon"]
  },
  {
    "id": 27,
    "title": "Jardin botanique",
    "src": "/images/photo-27.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-27.jpg",
    "keywords": ["jardin", "botanique", "fleurs"]
  },
  {
    "id": 28,
    "title": "Rocher en mer",
    "src": "/images/photo-28.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-28.jpg",
    "keywords": ["rocher", "mer", "océan"]
  },
  {
    "id": 29,
    "title": "Plage et palmiers",
    "src": "/images/photo-29.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-29.jpg",
    "keywords": ["plage", "palmiers", "tropical"]
  },
  {
    "id": 30,
    "title": "Lumières de la ville",
    "src": "/images/photo-30.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-30.jpg",
    "keywords": ["lumières", "ville", "nuit"]
  },
  {
    "id": 31,
    "title": "Île tropicale",
    "src": "/images/photo-31.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-31.jpg",
    "keywords": ["île", "tropicale", "plage"]
  },
  {
    "id": 32,
    "title": "Bord de rivière",
    "src": "/images/photo-32.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-32.jpg",
    "keywords": ["rivière", "bord", "nature"]
  },
  {
    "id": 33,
    "title": "Forêt tropicale",
    "src": "/images/photo-33.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-33.jpg",
    "keywords": ["forêt", "tropicale", "nature"]
  },
  {
    "id": 34,
    "title": "Champs de coquelicots",
    "src": "/images/photo-34.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-34.jpg",
    "keywords": ["champs", "coquelicots", "été"]
  },
  {
    "id": 35,
    "title": "Méridien du désert",
    "src": "/images/photo-35.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-35.jpg",
    "keywords": ["désert", "méridien", "sable"]
  },
  {
    "id": 36,
    "title": "Rivière en hiver",
    "src": "/images/photo-36.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-36.jpg",
    "keywords": ["rivière", "hiver", "neige"],
    "isBest":true
  },
  {
    "id": 37,
    "title": "Dunes de sable au lever du soleil",
    "src": "/images/photo-37.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-37.jpg",
    "keywords": ["dunes", "lever du soleil", "désert"]
  },
  {
    "id": 38,
    "title": "Lac de montagne",
    "src": "/images/photo-38.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-38.jpg",
    "keywords": ["lac", "montagne", "nature"]
  },
  {
    "id": 39,
    "title": "Château en ruines",
    "src": "/images/photo-39.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-39.jpg",
    "keywords": ["château", "ruines", "histoire"]
  },
  {
    "id": 40,
    "title": "Rivière à travers les collines",
    "src": "/images/photo-40.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-40.jpg",
    "keywords": ["rivière", "collines", "nature"]
  },
  {
    "id": 41,
    "title": "Ponton en bois",
    "src": "/images/photo-41.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-41.jpg",
    "keywords": ["ponton", "bois", "eau"],
    "isBest":true
  },
  {
    "id": 42,
    "title": "Panorama de montagne",
    "src": "/images/photo-42.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-42.jpg",
    "keywords": ["panorama", "montagne", "paysage"]
  },
  {
    "id": 43,
    "title": "Lac en montagne",
    "src": "/images/photo-43.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-43.jpg",
    "keywords": ["lac", "montagne", "nature"]
  },
  {
    "id": 44,
    "title": "Forêt de pins",
    "src": "/images/photo-44.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-44.jpg",
    "keywords": ["forêt", "pins", "nature"]
  },
  {
    "id": 45,
    "title": "Îles mystérieuses",
    "src": "/images/photo-45.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-45.jpg",
    "keywords": ["îles", "mystérieuses", "océan"]
  },
  {
    "id": 46,
    "title": "Rivière sinueuse",
    "src": "/images/photo-46.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-46.jpg",
    "keywords": ["rivière", "sinueuse", "nature"]
  },
  {
    "id": 47,
    "title": "Château médiéval",
    "src": "/images/photo-47.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-47.jpg",
    "keywords": ["château", "médiéval", "architecture"]
  },
  {
    "id": 48,
    "title": "Cascade dans la jungle",
    "src": "/images/photo-48.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-48.jpg",
    "keywords": ["cascade", "jungle", "nature"]
  },
  {
    "id": 49,
    "title": "Arbres en automne",
    "src": "/images/photo-49.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-49.jpg",
    "keywords": ["arbres", "automne", "feuilles"]
  },
  {
    "id": 50,
    "title": "Phare au bord de l'eau",
    "src": "/images/photo-50.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-50.jpg",
    "keywords": ["phare", "eau", "architecture"]
  },
  {
    "id": 51,
    "title": "Chemin dans les dunes",
    "src": "/images/photo-51.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-51.jpg",
    "keywords": ["chemin", "dunes", "désert"]
  },
  {
    "id": 52,
    "title": "Plage ensoleillée",
    "src": "/images/photo-52.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-52.jpg",
    "keywords": ["plage", "ensoleillée", "mer"]
  },
  {
    "id": 53,
    "title": "Montagne brumeuse",
    "src": "/images/photo-53.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-53.jpg",
    "keywords": ["montagne", "brumeuse", "nature"]
  },
  {
    "id": 54,
    "title": "Vallée glacière",
    "src": "/images/photo-54.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-54.jpg",
    "keywords": ["vallée", "glacière", "hiver"]
  },
  {
    "id": 55,
    "title": "Rivière de montagne",
    "src": "/images/photo-55.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-55.jpg",
    "keywords": ["rivière", "montagne", "nature"]
  },
  {
    "id": 56,
    "title": "Champs de blé",
    "src": "/images/photo-56.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-56.jpg",
    "keywords": ["champs", "blé", "été"]
  },
  {
    "id": 57,
    "title": "Village en hiver",
    "src": "/images/photo-57.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-57.jpg",
    "keywords": ["village", "hiver", "neige"]
  },
  {
    "id": 58,
    "title": "Pondéré de printemps",
    "src": "/images/photo-58.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-58.jpg",
    "keywords": ["printemps", "fleurs", "nature"],
    "isBest":true
  },
  {
    "id": 59,
    "title": "Ruisseau en forêt",
    "src": "/images/photo-59.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-59.jpg",
    "keywords": ["ruisseau", "forêt", "nature"],
    "isBest":true
  },
  {
    "id": 60,
    "title": "Plage sous la lune",
    "src": "/images/photo-60.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-60.jpg",
    "keywords": ["plage", "lune", "nuit"]
  },
  {
    "id": 61,
    "title": "Îles en mer",
    "src": "/images/photo-61.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-61.jpg",
    "keywords": ["îles", "mer", "océan"],
    "isBest":true
  },
  {
    "id": 62,
    "title": "Vieux pont",
    "src": "/images/photo-62.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-62.jpg",
    "keywords": ["vieux", "pont", "architecture"]
  },
  {
    "id": 63,
    "title": "Prairie sous la neige",
    "src": "/images/photo-63.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-63.jpg",
    "keywords": ["prairie", "neige", "hiver"]
  },
  {
    "id": 64,
    "title": "Forêt mystérieuse",
    "src": "/images/photo-64.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-64.jpg",
    "keywords": ["forêt", "mystérieuse", "nature"]
  },
  {
    "id": 65,
    "title": "Vue panoramique",
    "src": "/images/photo-65.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-65.jpg",
    "keywords": ["vue", "panoramique", "paysage"],
    "isBest":true
  },
  {
    "id": 66,
    "title": "Cascade dans les montagnes",
    "src": "/images/photo-66.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-66.jpg",
    "keywords": ["cascade", "montagnes", "nature"]
  },
  {
    "id": 67,
    "title": "Plage à marée basse",
    "src": "/images/photo-67.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-67.jpg",
    "keywords": ["plage", "marée basse", "mer"]
  },
  {
    "id": 68,
    "title": "Panorama côtier",
    "src": "/images/photo-68.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-68.jpg",
    "keywords": ["panorama", "côtier", "océan"]
  },
  {
    "id": 69,
    "title": "Lac calme",
    "src": "/images/photo-69.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-69.jpg",
    "keywords": ["lac", "calme", "nature"]
  },
  {
    "id": 70,
    "title": "Champs de tournesols",
    "src": "/images/photo-70.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-70.jpg",
    "keywords": ["champs", "tournesols", "été"]
  },
  {
    "id": 71,
    "title": "Ruines antiques",
    "src": "/images/photo-71.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-71.jpg",
    "keywords": ["ruines", "antiques", "histoire"]
  },
  {
    "id": 72,
    "title": "Cascade en forêt",
    "src": "/images/photo-72.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-72.jpg",
    "keywords": ["cascade", "forêt", "nature"]
  },
  {
    "id": 73,
    "title": "Bord de lac en automne",
    "src": "/images/photo-73.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-73.jpg",
    "keywords": ["bord de lac", "automne", "nature"]
  },
  {
    "id": 74,
    "title": "Vallée verdoyante en été",
    "src": "/images/photo-74.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-74.jpg",
    "keywords": ["vallée", "verdoyante", "été"],
    "isBest":true
  },
  {
    "id": 75,
    "title": "Plage tropicale au coucher du soleil",
    "src": "/images/photo-75.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-75.jpg",
    "keywords": ["plage", "tropicale", "coucher de soleil"]
  },
  {
    "id": 76,
    "title": "Falaise sur la côte",
    "src": "/images/photo-76.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-76.jpg",
    "keywords": ["falaise", "côte", "océan"],
    "isBest":true
  },
  {
    "id": 77,
    "title": "Coucher de soleil derrière les montagnes",
    "src": "/images/photo-77.jpg",
    "thumbnailSrc": "/images/thumbnails/photo-77.jpg",
    "keywords": ["coucher de soleil", "montagnes", "nature"],
    "isBest":true
  }
];


export default photos;
  