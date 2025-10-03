// src/data/photoData.js
const base = import.meta.env.BASE_URL || "/";

export const photoData = [
  {
    id: 1,
    imageUrl: `${base}photos/photos_01.jpg`,
    description: "산책하는 마루",
  },
  {
    id: 2,
    imageUrl: `${base}photos/photos_02.jpg`,
    description: "물고기와 마루",
  },
  {
    id: 3,
    imageUrl: `${base}photos/photos_03.jpg`,
    description: "서커스 마루",
  },
];

