import { useState } from 'react';
import { Link } from 'react-router-dom';
import photo1 from '../assets/1.jpg';
import photo2 from '../assets/2.jpg';
import photo3 from '../assets/3.jpg';
import photo4 from '../assets/4.jpg';
import photo5 from '../assets/5.jpg';
import photo6 from '../assets/6.jpg';

// 인생네컷 사진 데이터 배열
const PHOTOS = [
  {
    id: 1,
    image: photo1,
    date: '2026.01.07',
    location: '용산',
    caption: '영화본날 🎞️',
    likes: 107,
  },
  {
    id: 2,
    image: photo2,
    date: '2026.01.10',
    location: '파주',
    caption: '세정이 파주온날',
    likes: 110,
  },
  {
    id: 3,
    image: photo3,
    date: '2026.01.27',
    location: '코엑스',
    caption: '아쿠아리움 에서',
    likes: 127,
  },
  {
    id: 4,
    image: photo4,
    date: '2026.01.31',
    location: '마장호수',
    caption: '세정이가 졸업 축하해준날',
    likes: 131,
  },
  {
    id: 5,
    image: photo5,
    date: '2026.02.08',
    location: '영종도',
    caption: '우리 사귄날',
    likes: 208,
  },
  {
    id: 6,
    image: photo6,
    date: '2026.02.14',
    location: '강남',
    caption: '꼬기 먹은날',
    likes: 214,
  },
];

function PhotoCard({ photo }) {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  // 더블클릭으로 좋아요
  const handleDoubleClick = () => {
    if (!liked) {
      setLiked(true);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-8 max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center">
          <span className="text-white text-lg">💗</span>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">미뇽 & 세정</p>
          <p className="text-xs text-gray-500">{photo.location}</p>
        </div>
      </div>

      {/* 사진 */}
      <div
        className="relative bg-gradient-to-br from-pink-100 to-rose-100 cursor-pointer select-none aspect-square"
        onDoubleClick={handleDoubleClick}
      >
        {photo.image ? (
          <img
            src={photo.image}
            alt={photo.caption}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2 opacity-30">📷</div>
              <p className="text-pink-400 text-xs opacity-50">사진 추가 예정</p>
            </div>
          </div>
        )}
        {/* 더블클릭 하트 애니메이션 */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-8xl animate-ping opacity-80">💗</div>
          </div>
        )}
      </div>

      {/* 액션 버튼 */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => setLiked(!liked)}
            className="text-2xl transition-transform active:scale-125"
          >
            {liked ? '❤️' : '🤍'}
          </button>
          <button className="text-2xl transition-transform active:scale-125">💬</button>
          <button className="text-2xl transition-transform active:scale-125">📤</button>
        </div>

        {/* 좋아요 수 */}
        <p className="font-semibold text-sm text-gray-800 mb-2">
          좋아요 {liked ? photo.likes + 1 : photo.likes}개
        </p>

        {/* 캡션 */}
        <div className="text-sm text-gray-800 mb-1">
          <span className="font-semibold">미뇽 & 세정</span>{' '}
          <span className="text-gray-700">{photo.caption}</span>
        </div>
      </div>
    </div>
  );
}

export default function SejungGallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center">
          <Link
            to="/sejung"
            className="text-rose-400 hover:text-rose-500 text-xl mr-4"
          >
            ←
          </Link>
          <h1 className="text-xl font-semibold text-gray-800 flex-1">인생네컷 모음 📸</h1>
        </div>
      </div>

      {/* 피드 */}
      <div className="py-6 px-4">
        {PHOTOS.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}

        {/* 사진 추가 안내 */}
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="text-6xl mb-4 opacity-20">🎞️</div>
          <p className="text-gray-400 text-sm">
            앞으로도 인생네컷 많이 찍자 💗
          </p>
        </div>
      </div>
    </div>
  );
}
