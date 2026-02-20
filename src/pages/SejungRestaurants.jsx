import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 맛집 데이터 (가본 곳 / 가고 싶은 곳)
const RESTAURANTS = [
  // 가본 곳
  {
    id: 1,
    name: '신사동 동녘',
    lat: 37.5246,
    lng: 127.0205,
    category: '한식',
    menu: '보쌈',
    date: '2026.01.03',
    visited: true,
    memo: '처음 만난 날! 보쌈 진짜 맛있었어 💕',
  },
  {
    id: 2,
    name: '삼겹살집',
    lat: 37.5172,
    lng: 127.0473,
    category: '한식',
    menu: '삼겹살',
    date: '2026.01.07',
    visited: true,
    memo: '세정이가 사준 삼겹살 🥓',
  },
  {
    id: 3,
    name: '강남 뼈찜집',
    lat: 37.4979,
    lng: 127.0276,
    category: '한식',
    menu: '뼈찜',
    date: '2026.01.27',
    visited: true,
    memo: '꽃 받고 먹은 뼈찜 매콤하니 맛있었어',
  },
  {
    id: 4,
    name: '용인 푸파',
    lat: 37.2411,
    lng: 127.1776,
    category: '한식',
    menu: '고기',
    date: '2026.02.16',
    visited: true,
    memo: '미뇽이 용인까지 온 날 🥩',
  },
];

// 커스텀 마커 아이콘
const createIcon = (visited) => {
  const color = visited ? '#f43f5e' : '#fb923c'; // 가본 곳: 핑크, 가고 싶은 곳: 오렌지
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    "></div>`,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

// 지도 중심 업데이트
function MapController({ center }) {
  const map = useMap();
  if (center) {
    map.setView(center, 13);
  }
  return null;
}

export default function SejungRestaurants() {
  const [filter, setFilter] = useState('all'); // all, visited, wishlist
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState([37.5246, 127.0276]); // 서울 중심

  const filteredRestaurants = RESTAURANTS.filter(r => {
    if (filter === 'visited') return r.visited;
    if (filter === 'wishlist') return !r.visited;
    return true;
  });

  const visitedCount = RESTAURANTS.filter(r => r.visited).length;
  const wishlistCount = RESTAURANTS.filter(r => !r.visited).length;

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setMapCenter([place.lat, place.lng]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍽️</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-2">
            우리의 맛집 지도
          </h1>
          <p className="text-pink-400">같이 가본 곳, 가고 싶은 곳</p>
        </div>

        {/* 통계 & 필터 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 text-sm">
              <span className="text-rose-500 font-semibold">
                🍴 가본 곳: {visitedCount}
              </span>
              <span className="text-orange-500 font-semibold">
                ⭐ 가고 싶은 곳: {wishlistCount}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                filter === 'all'
                  ? 'bg-rose-400 text-white'
                  : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('visited')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                filter === 'visited'
                  ? 'bg-rose-400 text-white'
                  : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              }`}
            >
              가본 곳
            </button>
            <button
              onClick={() => setFilter('wishlist')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                filter === 'wishlist'
                  ? 'bg-orange-400 text-white'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              }`}
            >
              가고 싶은 곳
            </button>
          </div>
        </div>

        {/* 지도 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-4 mb-6 overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: '400px', borderRadius: '20px' }}
            scrollWheelZoom={false}
          >
            <MapController center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            {filteredRestaurants.map(place => (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={createIcon(place.visited)}
                eventHandlers={{
                  click: () => handlePlaceClick(place),
                }}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-rose-500">{place.name}</p>
                    <p className="text-xs text-gray-600">{place.menu}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 선택된 장소 상세 */}
        {selectedPlace && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 sejung-letter-open">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-rose-500">
                {selectedPlace.name}
              </h3>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                selectedPlace.visited
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-orange-100 text-orange-600'
              }`}>
                {selectedPlace.visited ? '가본 곳' : '가고 싶은 곳'}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">카테고리:</span> {selectedPlace.category}</p>
              <p><span className="font-semibold">메뉴:</span> {selectedPlace.menu}</p>
              <p className="text-pink-600 italic">{selectedPlace.memo}</p>
            </div>
          </div>
        )}

        {/* 리스트 뷰 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-rose-500 mb-4">맛집 리스트</h3>
          <div className="space-y-3">
            {filteredRestaurants.map(place => (
              <button
                key={place.id}
                onClick={() => handlePlaceClick(place)}
                className="w-full text-left bg-pink-50 hover:bg-pink-100 rounded-2xl p-4 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{place.name}</p>
                    <p className="text-xs text-gray-600">{place.menu} • {place.category}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    place.visited ? 'bg-rose-400' : 'bg-orange-400'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 돌아가기 */}
        <div className="text-center">
          <Link
            to="/sejung"
            className="text-pink-400 hover:text-pink-500 underline text-sm"
          >
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
