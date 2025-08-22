import React from 'react';
import { useNavigate } from 'react-router-dom';
import { photoData } from '../data/photoData';
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();

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
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        style={{
          margin: '20px 0',
          padding: '8px 18px',
          borderRadius: '6px',
          border: 'none',
          background: '#444',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
         뒤로가기
      </button>
    </div>
  );
};

export default Gallery;