import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css'; // 새로운 CSS 파일을 불러옵니다.
import L from 'leaflet';

// --- 맛집 데이터 (전체) ---
const RESTAURANTS = [
  // 서울
  { name: "을지로 우육면관", lat: 37.5665, lng: 126.9900, region: "서울", address: "서울 중구 을지로 12길 34", myRating: 4.8, myReview: "육향 가득한 국물이 일품. 웨이팅이 길 수 있음." },
  { name: "금돼지식당", lat: 37.5589, lng: 127.0101, region: "서울", address: "서울 중구 다산로 149", myRating: 4.9, myReview: "육즙 가득한 본삼겹과 등목살이 유명한 곳. 미슐랭 빕 구르망 선정 맛집." },
  { name: "다운타우너 한남", lat: 37.5361, lng: 127.0022, region: "서울", address: "서울 용산구 대사관로5길 12", myRating: 4.6, myReview: "아보카도 버거가 시그니처 메뉴. 웨이팅이 길지만 맛은 보장." },
  { name: "깡통만두", lat: 37.5794, lng: 126.9855, region: "서울", address: "서울 종로구 북촌로2길 5-4", myRating: 4.7, myReview: "만두전골과 비빔국수가 맛있는, 안국역 근처 숨은 맛집." },
  // 부산
  { name: "광안리 오반장", lat: 35.1532, lng: 129.1186, region: "부산", address: "부산 수영구 광안해변로 123", myRating: 4.6, myReview: "광안대교 뷰와 함께 즐기는 신선한 해산물." },
  { name: "해운대 소문난 암소갈비", lat: 35.1627, lng: 129.1603, region: "부산", address: "부산 해운대구 중동2로10번길 32-10", myRating: 4.8, myReview: "부드러운 생갈비와 감칠맛 나는 양념갈비가 일품. 마지막 감자사리는 필수." },
  { name: "쌍둥이돼지국밥", lat: 35.1322, lng: 129.0645, region: "부산", address: "부산 남구 유엔평화로 19", myRating: 4.5, myReview: "부산하면 돼지국밥. 잡내 없이 깔끔하고 깊은 국물 맛이 특징." },
  { name: "신발원", lat: 35.1147, lng: 129.0396, region: "부산", address: "부산 동구 대영로243번길 62", myRating: 4.7, myReview: "부산역 차이나타운의 명물. 고기만두와 콩국+꽈배기 조합을 추천." },
  // 경기도
  { name: "일산 칼국수 본점", lat: 37.6836, lng: 126.7797, region: "경기도", address: "경기 고양시 일산동구 경의로 46-23", myRating: 4.7, myReview: "닭고기가 듬뿍 들어간 진한 국물이 인상적." },
  { name: "토담", lat: 37.2915, lng: 127.4320, region: "경기도", address: "경기 이천시 경충대로3052번길 46", myRating: 4.6, myReview: "이천 쌀밥과 함께 정갈한 한정식을 맛볼 수 있는 곳. 분위기가 좋다." },
  { name: "산으로간고등어", lat: 37.3110, lng: 127.0673, region: "경기도", address: "경기 용인시 수지구 고기로 126", myRating: 4.5, myReview: "화덕에서 구워낸 담백한 고등어구이 정식. 반찬은 셀프바에서 무한리필." },
  { name: "라오샹", lat: 37.8605, lng: 126.7792, region: "경기도", address: "경기 파주시 문산읍 문향로 72", myRating: 4.4, myReview: "파주 문산의 짜장면 노포. 진한 옛날 짜장 스타일을 맛볼 수 있다." },
  // 강원도
  { name: "강릉 동화가든", lat: 37.7886, lng: 128.9133, region: "강원도", address: "강원 강릉시 초당순두부길77번길 15", myRating: 4.9, myReview: "짬뽕순두부의 원조. 웨이팅은 필수지만 기다릴 가치가 있는 맛." },
  { name: "만석닭강정 중앙시장점", lat: 38.2057, lng: 128.5910, region: "강원도", address: "강원 속초시 중앙로147번길 16", myRating: 4.6, myReview: "속초의 명물. 식어도 바삭하고 맛있는 닭강정." },
  { name: "봉포머구리집", lat: 38.2195, lng: 128.5975, region: "강원도", address: "강원 속초시 영랑해안길 223", myRating: 4.7, myReview: "다양한 해산물이 들어간 시원한 모듬 물회가 대표 메뉴. 바다 뷰는 덤." },
  { name: "산토리니", lat: 37.8643, lng: 127.7770, region: "강원도", address: "강원 춘천시 동면 순환대로 1154-97", myRating: 4.3, myReview: "춘천 구봉산 카페거리의 랜드마크. 그리스 산토리니를 연상시키는 멋진 뷰." },
];

// --- 커스텀 마커 아이콘 생성 ---
const createCustomIcon = (isSelected) => {
  return L.divIcon({
    html: `<div class="marker-pin ${isSelected ? 'selected' : ''}"></div>`,
    className: 'custom-marker-icon',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -35]
  });
};

// --- 지도 컨트롤러 ---
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
    "서울": [37.5665, 126.9780], "부산": [35.1796, 129.0756],
    "경기도": [37.4138, 127.5183], "강원도": [37.8813, 127.7298],
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedRestaurant(null); 
  }

  return (
    <div className="maps-container">
      <h1>맛집 지도</h1>
      <p className="subtitle">지도 위의 핀을 클릭해보세요!</p>
      
      <div className="region-filters">
        {Object.keys(regionCenter).map(region => (
          <button
            key={region}
            onClick={() => handleRegionChange(region)}
            className={`region-btn ${selectedRegion === region ? 'active' : ''}`}
          >
            {region}
          </button>
        ))}
      </div>

      <MapContainer
        center={regionCenter[selectedRegion]}
        zoom={10}
        style={{ height: '500px', width: '100%', borderRadius: '16px', margin: '0 auto 1.5rem auto', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
      >
        <MapController
          center={regionCenter[selectedRegion]}
          zoom={10}
          onMapClick={() => setSelectedRestaurant(null)}
        />
        {/* 지도를 원래의 밝은 색상으로 변경 */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {RESTAURANTS.filter(r => r.region === selectedRegion).map((r) => (
          <Marker 
            key={r.name} 
            position={[r.lat, r.lng]}
            icon={createCustomIcon(selectedRestaurant?.name === r.name)}
            eventHandlers={{ click: () => { setSelectedRestaurant(r); } }}
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
            <p className="details-panel-address">📍 {selectedRestaurant.address}</p>
            <p className="details-panel-review">{selectedRestaurant.myReview}</p>
          </div>
        )}
      </div>

      <Link to="/home" className="home-link-btn">
        홈으로 돌아가기 ↗
      </Link>
    </div>
  );
}
