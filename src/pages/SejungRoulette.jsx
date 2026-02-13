import { useState } from 'react';
import { Link } from 'react-router-dom';

const PLACES = ['카페 ☕', '영화관 🎬', '맛집 🍽️', '공원 🌳', '한강 🌊', '쇼핑 🛍️'];
const MENUS  = ['한식 🍚', '중식 🥟', '일식 🍣', '양식 🍝', '분식 🍢', '디저트 🍰'];

function Roulette({ title, items, emoji }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraTurns = 5 + Math.floor(Math.random() * 3);
    const winIdx = Math.floor(Math.random() * items.length);
    const sliceAngle = 360 / items.length;
    const targetAngle = rotation + extraTurns * 360 + (360 - winIdx * sliceAngle);

    setRotation(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(items[winIdx]);
    }, 3000);
  };

  return (
    <div className="text-center">
      <h2 className="text-rose-500 font-bold text-lg mb-4">{title}</h2>

      {/* wheel */}
      <div className="relative inline-block mb-4">
        {/* pointer */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl z-10">▼</div>
        <div
          className="w-52 h-52 sm:w-60 sm:h-60 rounded-full border-4 border-rose-300 shadow-lg relative overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {items.map((item, i) => {
            const angle = (360 / items.length) * i;
            return (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="absolute text-xs sm:text-sm font-semibold text-rose-700 whitespace-nowrap"
                  style={{
                    top: '12%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
          {/* slice lines */}
          {items.map((_, i) => {
            const angle = (360 / items.length) * i;
            return (
              <div
                key={`line-${i}`}
                className="absolute top-0 left-1/2 h-1/2 w-px bg-rose-200 origin-bottom"
                style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
              />
            );
          })}
          {/* center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-rose-300 flex items-center justify-center text-lg">
            {emoji}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={spin}
          disabled={spinning}
          className={`px-6 py-3 rounded-full font-bold text-white shadow-lg transition ${
            spinning
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-rose-400 hover:bg-rose-500 active:bg-rose-600'
          }`}
        >
          {spinning ? '돌리는 중...' : '돌리기! 🎯'}
        </button>
      </div>

      {result && (
        <div className="mt-4 bg-white/70 backdrop-blur rounded-2xl px-6 py-4 shadow-sm inline-block sejung-fade-in">
          <p className="text-rose-500 font-bold text-xl">{result}</p>
        </div>
      )}
    </div>
  );
}

export default function SejungRoulette() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 px-4 py-12 relative">
      <div className="text-center mb-10">
        <div className="text-4xl mb-3">🎰</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-2">룰렛 데이트</h1>
        <p className="text-pink-400">오늘 뭐 하지? 룰렛에 맡겨봐! 🎲</p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <Roulette title="어디 갈까? 📍" items={PLACES} emoji="📍" />
        <Roulette title="뭐 먹을까? 🍴" items={MENUS} emoji="🍴" />
      </div>

      <div className="text-center mt-12">
        <Link to="/sejung" className="text-pink-400 hover:text-pink-500 underline text-sm">
          ← 돌아가기
        </Link>
      </div>
    </div>
  );
}
