import React from 'react';
import { photoData } from '../data/photoData'; // 1번에서 만든 데이터 import
import './Gallery.css'; // 갤러리 전용 CSS 파일 import

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">My Gallery</h1>
      <div className="photo-grid">
        {photoData.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.imageUrl} alt={photo.description} />
            <div className="photo-overlay">
              <p>{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;