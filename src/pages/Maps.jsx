import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";
import L from "leaflet";

// --- 맛집 데이터(샘플) ---
const RESTAURANTS = [
  // 서울
  { name: "을지로 우육면관", lat: 37.5665, lng: 126.99, region: "서울", address: "서울 중구 을지로", myRating: 4.8, myReview: "향이 풍부한 우육면." },
  { name: "금돼지식당", lat: 37.5589, lng: 127.0101, region: "서울", address: "서울 중구 신당동", myRating: 4.9, myReview: "육즙 가득 본삼겹." },
  // 부산
  { name: "광안리 해변 포차", lat: 35.1532, lng: 129.1186, region: "부산", address: "부산 수영구 광안리", myRating: 4.6, myReview: "야경과 함께 즐기는 포차." },
  { name: "경천애인 2237", lat: 35.1627, lng: 129.1603, region: "부산", address: "부산 해운대구", myRating: 4.7, myReview: "질 좋은 고기와 분위기." },
  // 경기
  { name: "일산 칼국수", lat: 37.6836, lng: 126.7797, region: "경기", address: "경기 고양시", myRating: 4.7, myReview: "진한 육수가 일품." },
  { name: "의정부 부대찌개", lat: 37.738, lng: 127.0445, region: "경기", address: "경기 의정부시", myRating: 4.5, myReview: "역사와 전통의 맛." },
  // 강원
  { name: "강릉 초당두부", lat: 37.7886, lng: 128.9133, region: "강원", address: "강원 강릉시", myRating: 4.8, myReview: "담백하고 고소한 두부." },
  { name: "속초 만석닭강정", lat: 38.2057, lng: 128.591, region: "강원", address: "강원 속초시", myRating: 4.6, myReview: "바삭달달한 닭강정." },
];

// --- 커스텀 마커 ---
const createCustomIcon = (isSelected) => {
  return L.divIcon({
    html: `<div class="marker-pin ${isSelected ? "selected" : ""}"></div>`,
    className: "custom-marker-icon",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -35],
  });
};

// --- 맵 컨트롤러 ---
function MapController({ center, zoom, onMapClick }) {
  const map = useMap();
  map.setView(center, zoom);
  useMapEvents({ click: () => onMapClick() });
  return null;
}

export default function Maps() {
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const regionCenter = {
    서울: [37.5665, 126.978],
    부산: [35.1796, 129.0756],
    경기: [37.4138, 127.5183],
    강원: [37.8813, 127.7298],
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedRestaurant(null);
  };

  return (
    <div className="maps-container">
      <h1>맛집 지도</h1>
      <p className="subtitle">지역을 클릭해보세요!</p>

      <div className="region-filters">
        {Object.keys(regionCenter).map((region) => (
          <button
            key={region}
            onClick={() => handleRegionChange(region)}
            className={`region-btn ${selectedRegion === region ? "active" : ""}`}
          >
            {region}
          </button>
        ))}
      </div>

      <MapContainer
        center={regionCenter[selectedRegion]}
        zoom={10}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "16px",
          margin: "0 auto 1.5rem auto",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        <MapController
          center={regionCenter[selectedRegion]}
          zoom={10}
          onMapClick={() => setSelectedRestaurant(null)}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {RESTAURANTS.filter((r) => r.region === selectedRegion).map((r) => (
          <Marker
            key={r.name}
            position={[r.lat, r.lng]}
            icon={createCustomIcon(selectedRestaurant?.name === r.name)}
            eventHandlers={{ click: () => setSelectedRestaurant(r) }}
          >
            <Popup>{r.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="details-panel-wrapper">
        {selectedRestaurant && (
          <div className="details-panel">
            <div className="details-panel-header">
              <h2>{selectedRestaurant.name}</h2>
              <span className="details-panel-rating">★ {selectedRestaurant.myRating}</span>
            </div>
            <p className="details-panel-address">주소: {selectedRestaurant.address}</p>
            <p className="details-panel-review">{selectedRestaurant.myReview}</p>
          </div>
        )}
      </div>

      <Link to="/home" className="home-link-btn">
        메인으로 돌아가기
      </Link>
    </div>
  );
}

