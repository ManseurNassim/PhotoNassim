const photos = [
  {
    "id": 1,
    "title": "Photo 1",
    "src": "./images/photo-01.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-01.jpg",
    "keywords": ["portrait","statue","monument","place","jour","Alger","Cheval","Sculpture","épée","cheval","sombre","noir et blanc","B&W"]
  },

  {
    "id": 2,
    "title": "Photo 2",
    "src": "./images/photo-02.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-02.jpg",
    "keywords": ["paysage","plage","couché de soleil","soleil","couché","drapeau","eau","pierre","montagne","oiseau","nature"],
    "isBest": true
  },
  {
    "id": 4,
    "title": "Photo 4",
    "src": "./images/photo-04.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-04.jpg",
    "keywords": ["portrait","vue de haut","monument","Oran","Ville","statue","fort","santa cruz","architecture","port","cargo",'lumineux',"jour"]
  },  {
    "id": 54,
    "title": "Photo 54",
    "src": "./images/photo-54.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-54.jpg",
    "keywords": [],
    "isBest": true
  },
 {
    "id": 37,
    "title": "Photo 37",
    "src": "./images/photo-37.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-37.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 63,
    "title": "Photo 63",
    "src": "./images/photo-63.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-63.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 80,
    "title": "Photo 80",
    "src": "./images/photo-80.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-80.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 29,
    "title": "Photo 29",
    "src": "./images/photo-29.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-29.jpg",
    "keywords": [],
    "isBest": true
  },{
    "id": 3,
    "title": "Photo 3",
    "src": "./images/photo-03.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-03.jpg",
    "keywords": ["portrait","statue","monument","place","jour","Alger","Cheval","Sculpture","épée","cheval","lumineux"],
    "isBest": true
  },  {
    "id": 56,
    "title": "Photo 56",
    "src": "./images/photo-56.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-56.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 6,
    "title": "Photo 6",
    "src": "./images/photo-06.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-06.jpg",
    "keywords": ["paysage","montagne","village","nature","kabylie","kabyle","vallé","maison","vue de haut","lumineux","jour","vert"],
    "isBest": true
  },
  {
    "id": 7,
    "title": "Photo 7",
    "src": "./images/photo-07.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-07.jpg",
    "keywords": ["masjid","mosquée","architecture","jour","portrait","alger"]
  },
  {
    "id": 8,
    "title": "Photo 8",
    "src": "./images/photo-08.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-08.jpg",
    "keywords": ["nuage","ciel","portrait","vue du ciel","jour"]
  },  
  {
    "id": 10,
    "title": "Photo 10",
    "src": "./images/photo-10.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-10.jpg",
    "keywords": ["oran","cargo","arbre","nature","mer","falaise","montagne","portrait","vue de haut","jour"]
  },
  {
    "id": 11,
    "title": "Photo 11",
    "src": "./images/photo-11.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-11.jpg",
    "keywords": ["oran","ville","vue de haut","cadre","portrait","plat","jour","ciel","fort","orangé"]
  },
  {
    "id": 12,
    "title": "Photo 12",
    "src": "./images/photo-12.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-12.jpg",
    "keywords": ["masjid","mosquée","couché de soleil","jour","mer","montagne","ville","architecture","oran"]
  },
  {
    "id": 13,
    "title": "Photo 13",
    "src": "./images/photo-13.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-13.jpg",
    "keywords": ["paysage","village","vert","nature","jour","ciel","nuage","maison","vue de haut","arbre","kabyle","kabylie"],
    "isBest": true
  },
  {
    "id": 14,
    "title": "Photo 14",
    "src": "./images/photo-14.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-14.jpg",
    "keywords": ["fort","santa cruz","orangé","lumineux","jour","rocher","architecture","oran"],
    "isBest": true
  },  {
    "id": 51,
    "title": "Photo 51",
    "src": "./images/photo-51.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-51.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 15,
    "title": "Photo 15",
    "src": "./images/photo-15.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-15.jpg",
    "keywords": ["monument","statue","soldat","homme","arme","jour","alger","Monument Martyrs","Maqam Echahid","Maqam chahid","portrait"]
  },
  {
    "id": 16,
    "title": "Photo 16",
    "src": "./images/photo-16.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-16.jpg",
    "keywords": ["portrait","ville","arbre","vue de haut","mer","alger","jour","ciel","architecture"],
    "isBest": true
  },
  {
    "id": 17,
    "title": "Photo 17",
    "src": "./images/photo-17.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-17.jpg",
    "keywords": ["nuage","ciel","portrait","vue du ciel","jour"]
  },
  {
    "id": 18,
    "title": "Photo 18",
    "src": "./images/photo-18.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-18.jpg",
    "keywords": ["alger","port","portrait","mer","vue de haut","architecture","jour","ciel"]
  },
  {
    "id": 19,
    "title": "Photo 19",
    "src": "./images/photo-19.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-19.jpg",
    "keywords": []
  },
  {
    "id": 20,
    "title": "Photo 20",
    "src": "./images/photo-20.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-20.jpg",
    "keywords": []
  },
  {
    "id": 21,
    "title": "Photo 21",
    "src": "./images/photo-21.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-21.jpg",
    "keywords": []
  },
  {
    "id": 22,
    "title": "Photo 22",
    "src": "./images/photo-22.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-22.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 23,
    "title": "Photo 23",
    "src": "./images/photo-23.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-23.jpg",
    "keywords": []
  },
  {
    "id": 24,
    "title": "Photo 24",
    "src": "./images/photo-24.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-24.jpg",
    "keywords": []
  },
  {
    "id": 25,
    "title": "Photo 25",
    "src": "./images/photo-25.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-25.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 26,
    "title": "Photo 26",
    "src": "./images/photo-26.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-26.jpg",
    "keywords": []
  },
  {
    "id": 27,
    "title": "Photo 27",
    "src": "./images/photo-27.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-27.jpg",
    "keywords": []
  },
  {
    "id": 28,
    "title": "Photo 28",
    "src": "./images/photo-28.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-28.jpg",
    "keywords": []
  },

  {
    "id": 30,
    "title": "Photo 30",
    "src": "./images/photo-30.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-30.jpg",
    "keywords": []
  },
  {
    "id": 31,
    "title": "Photo 31",
    "src": "./images/photo-31.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-31.jpg",
    "keywords": [],
    "isBest": true
  },

  {
    "id": 33,
    "title": "Photo 33",
    "src": "./images/photo-33.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-33.jpg",
    "keywords": []
  },
  {
    "id": 34,
    "title": "Photo 34",
    "src": "./images/photo-34.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-34.jpg",
    "keywords": []
  },
  {
    "id": 35,
    "title": "Photo 35",
    "src": "./images/photo-35.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-35.jpg",
    "keywords": []
  },
  {
    "id": 36,
    "title": "Photo 36",
    "src": "./images/photo-36.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-36.jpg",
    "keywords": []
  },

  {
    "id": 38,
    "title": "Photo 38",
    "src": "./images/photo-38.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-38.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 68,
    "title": "Photo 68",
    "src": "./images/photo-68.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-68.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 39,
    "title": "Photo 39",
    "src": "./images/photo-39.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-39.jpg",
    "keywords": []
  },
  {
    "id": 40,
    "title": "Photo 40",
    "src": "./images/photo-40.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-40.jpg",
    "keywords": []
  },  {
    "id": 83,
    "title": "Photo 83",
    "src": "./images/photo-83.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-83.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 89,
    "title": "Photo 89",
    "src": "./images/photo-89.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-89.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 5,
    "title": "Photo 5",
    "src": "./images/photo-05.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-05.jpg",
    "keywords": ["masjid","alger","mosquée","dome","dôme","portrait","lumineux","oiseau","architecture","jour"],
    "isBest": true
  }, 
  {
    "id": 41,
    "title": "Photo 41",
    "src": "./images/photo-41.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-41.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 52,
    "title": "Photo 52",
    "src": "./images/photo-52.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-52.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 42,
    "title": "Photo 42",
    "src": "./images/photo-42.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-42.jpg",
    "keywords": []
  },
  {
    "id": 43,
    "title": "Photo 43",
    "src": "./images/photo-43.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-43.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 65,
    "title": "Photo 65",
    "src": "./images/photo-65.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-65.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 44,
    "title": "Photo 44",
    "src": "./images/photo-44.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-44.jpg",
    "keywords": []
  },
  {
    "id": 45,
    "title": "Photo 45",
    "src": "./images/photo-45.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-45.jpg",
    "keywords": []
  },
  {
    "id": 46,
    "title": "Photo 46",
    "src": "./images/photo-46.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-46.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 53,
    "title": "Photo 53",
    "src": "./images/photo-53.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-53.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 47,
    "title": "Photo 47",
    "src": "./images/photo-47.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-47.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 48,
    "title": "Photo 48",
    "src": "./images/photo-48.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-48.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 49,
    "title": "Photo 49",
    "src": "./images/photo-49.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-49.jpg",
    "keywords": []
  },
  {
    "id": 50,
    "title": "Photo 50",
    "src": "./images/photo-50.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-50.jpg",
    "keywords": []
  },






  {
    "id": 57,
    "title": "Photo 57",
    "src": "./images/photo-57.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-57.jpg",
    "keywords": []
  },
  {
    "id": 58,
    "title": "Photo 58",
    "src": "./images/photo-58.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-58.jpg",
    "keywords": []
  },
  {
    "id": 59,
    "title": "Photo 59",
    "src": "./images/photo-59.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-59.jpg",
    "keywords": []
  },
  {
    "id": 60,
    "title": "Photo 60",
    "src": "./images/photo-60.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-60.jpg",
    "keywords": []
  },
  {
    "id": 61,
    "title": "Photo 61",
    "src": "./images/photo-61.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-61.jpg",
    "keywords": []
  },
  {
    "id": 62,
    "title": "Photo 62",
    "src": "./images/photo-62.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-62.jpg",
    "keywords": []
  },

  {
    "id": 64,
    "title": "Photo 64",
    "src": "./images/photo-64.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-64.jpg",
    "keywords": []
  },

  {
    "id": 66,
    "title": "Photo 66",
    "src": "./images/photo-66.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-66.jpg",
    "keywords": []
  },
  {
    "id": 67,
    "title": "Photo 67",
    "src": "./images/photo-67.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-67.jpg",
    "keywords": []
  },

  {
    "id": 69,
    "title": "Photo 69",
    "src": "./images/photo-69.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-69.jpg",
    "keywords": []
  },
  {
    "id": 70,
    "title": "Photo 70",
    "src": "./images/photo-70.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-70.jpg",
    "keywords": []
  },
  {
    "id": 71,
    "title": "Photo 71",
    "src": "./images/photo-71.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-71.jpg",
    "keywords": []
  },
  {
    "id": 72,
    "title": "Photo 72",
    "src": "./images/photo-72.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-72.jpg",
    "keywords": []
  },
  {
    "id": 73,
    "title": "Photo 73",
    "src": "./images/photo-73.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-73.jpg",
    "keywords": []
  },
  {
    "id": 74,
    "title": "Photo 74",
    "src": "./images/photo-74.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-74.jpg",
    "keywords": []
  },
  {
    "id": 75,
    "title": "Photo 75",
    "src": "./images/photo-75.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-75.jpg",
    "keywords": []
  },
  {
    "id": 76,
    "title": "Photo 76",
    "src": "./images/photo-76.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-76.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 77,
    "title": "Photo 77",
    "src": "./images/photo-77.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-77.jpg",
    "keywords": []
  },
  {
    "id": 78,
    "title": "Photo 78",
    "src": "./images/photo-78.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-78.jpg",
    "keywords": []
  },
  {
    "id": 79,
    "title": "Photo 79",
    "src": "./images/photo-79.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-79.jpg",
    "keywords": []
  },

  {
    "id": 81,
    "title": "Photo 81",
    "src": "./images/photo-81.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-81.jpg",
    "keywords": []
  },
  {
    "id": 82,
    "title": "Photo 82",
    "src": "./images/photo-82.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-82.jpg",
    "keywords": []
  },

  {
    "id": 84,
    "title": "Photo 84",
    "src": "./images/photo-84.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-84.jpg",
    "keywords": []
  },
  {
    "id": 85,
    "title": "Photo 85",
    "src": "./images/photo-85.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-85.jpg",
    "keywords": []
  },
  {
    "id": 86,
    "title": "Photo 86",
    "src": "./images/photo-86.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-86.jpg",
    "keywords": []
  },
  {
    "id": 87,
    "title": "Photo 87",
    "src": "./images/photo-87.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-87.jpg",
    "keywords": []
  },
  {
    "id": 88,
    "title": "Photo 88",
    "src": "./images/photo-88.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-88.jpg",
    "keywords": [],
    "isBest": true
  },

  {
    "id": 90,
    "title": "Photo 90",
    "src": "./images/photo-90.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-90.jpg",
    "keywords": []
  },
  {
    "id": 91,
    "title": "Photo 91",
    "src": "./images/photo-91.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-91.jpg",
    "keywords": []
  },
  {
    "id": 92,
    "title": "Photo 92",
    "src": "./images/photo-92.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-92.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 93,
    "title": "Photo 93",
    "src": "./images/photo-93.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-93.jpg",
    "keywords": []
  },
  {
    "id": 94,
    "title": "Photo 94",
    "src": "./images/photo-94.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-94.jpg",
    "keywords": [],
    "isBest": true
  },  {
    "id": 55,
    "title": "Photo 55",
    "src": "./images/photo-55.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-55.jpg",
    "keywords": [],
    "isBest": true
  },
  {
    "id": 95,
    "title": "Photo 95",
    "src": "./images/photo-95.jpg",
    "thumbnailSrc": "./images/thumbnails/photo-95.jpg",
    "keywords": []
  }
];

export default photos;