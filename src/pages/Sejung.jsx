import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import myPhoto from '../assets/1123.jpg';

// 배경 꽃 장식 위치 - 렌더링마다 달라지지 않게 고정
const FLOWERS = [
  { emoji: '🌸', left: '5%',  top: '10%', size: '2rem', delay: '0s',   opacity: 0.35 },
  { emoji: '🌺', left: '18%', top: '75%', size: '2.4rem', delay: '0.6s', opacity: 0.3 },
  { emoji: '💐', left: '80%', top: '8%',  size: '2rem', delay: '1.2s', opacity: 0.28 },
  { emoji: '🌹', left: '88%', top: '65%', size: '2.2rem', delay: '0.3s', opacity: 0.3 },
  { emoji: '🌸', left: '50%', top: '5%',  size: '1.8rem', delay: '0.9s', opacity: 0.25 },
  { emoji: '🌺', left: '65%', top: '82%', size: '2rem', delay: '1.5s', opacity: 0.3 },
  { emoji: '🌸', left: '30%', top: '88%', size: '1.6rem', delay: '0.4s', opacity: 0.25 },
  { emoji: '💗', left: '92%', top: '30%', size: '1.8rem', delay: '0.7s', opacity: 0.25 },
];

export default function Sejung() {
  const [noStyle, setNoStyle] = useState({});
  const [yesScale, setYesScale] = useState(1);
  const [happy, setHappy] = useState(false);

  // 싫어요 버튼이 도망가는 함수
  const flee = () => {
    const padding = 80;
    const btnW = 140;
    const btnH = 60;
    const maxX = window.innerWidth - btnW - padding;
    const maxY = window.innerHeight - btnH - padding;
    const x = padding + Math.random() * (maxX - padding);
    const y = padding + Math.random() * (maxY - padding);

    setNoStyle({
      position: 'fixed',
      left: x,
      top: y,
      zIndex: 50,
    });
    // 좋아요 버튼 점점 커짐 (최대 2.6배)
    setYesScale(s => Math.min(s + 0.18, 2.6));
  };

  if (happy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200">
        {FLOWERS.map((f, i) => (
          <div
            key={i}
            className="absolute pointer-events-none sejung-float"
            style={{
              left: f.left, top: f.top,
              fontSize: f.size,
              opacity: f.opacity,
              animationDelay: f.delay,
            }}
          >
            {f.emoji}
          </div>
        ))}
        <div className="text-center z-10 relative px-6">
          <div className="text-7xl mb-6 sejung-spin-slow">🌸</div>
          <div className="relative inline-block mb-6">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-rose-300 shadow-xl mx-auto sejung-spin-slow" style={{ animationDuration: '8s' }}>
              <img src={myPhoto} alt="우리 사진" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-2 -right-2 text-3xl">💗</span>
            <span className="absolute -bottom-2 -left-2 text-3xl">🌸</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-4 leading-tight">
            야호~!! 🎉
          </h1>
          <p className="text-xl text-pink-500 mb-2">미뇽이가 너무 행복해합니다 크크</p>
          <p className="text-3xl mb-8">💗💗💗</p>

          {/* 서브 페이지 메뉴 */}
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {[
              { to: '/sejung/dday',     emoji: '💕', label: 'D-Day' },
              { to: '/sejung/timeline', emoji: '📸', label: '추억' },
              { to: '/sejung/letter',   emoji: '💌', label: '러브레터' },
              { to: '/sejung/roulette', emoji: '🎰', label: '룰렛 데이트' },
              { to: '/sejung/gallery',  emoji: '📷', label: '포토 갤러리' },
              { to: '/sejung/quiz',     emoji: '💭', label: '커플 퀴즈' },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="bg-white/60 backdrop-blur rounded-2xl px-4 py-3 shadow-sm hover:shadow-md hover:bg-white/80 transition flex items-center gap-2"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-rose-500 font-semibold text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <Link
          to="/home"
          className="absolute bottom-6 text-pink-400 hover:text-pink-500 underline text-sm z-10"
        >
          ← 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col items-center justify-center select-none">
      {/* 배경 꽃 장식 */}
      {FLOWERS.map((f, i) => (
        <div
          key={i}
          className="absolute pointer-events-none sejung-float"
          style={{
            left: f.left, top: f.top,
            fontSize: f.size,
            opacity: f.opacity,
            animationDelay: f.delay,
          }}
        >
          {f.emoji}
        </div>
      ))}

      {/* 메인 카드 */}
      <div className="text-center z-10 relative px-6">
        <div className="text-6xl mb-8">🌸</div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-500 mb-3 leading-tight drop-shadow-sm">
          미뇽님이 데이트를 신청했어요
        </h1>
        <p className="text-pink-400 mb-12 text-base sm:text-lg">어떻게 하시겠어요? 💌</p>

        <div className="flex items-center justify-center gap-10">
          {/* 좋아요 버튼 */}
          <button
            onClick={() => setHappy(true)}
            style={{
              transform: `scale(${yesScale})`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="px-8 py-4 bg-rose-400 hover:bg-rose-500 active:bg-rose-600 text-white font-bold text-lg rounded-full shadow-lg"
          >
            좋아요 💗
          </button>

          {/* 싫어요 버튼 - 마우스 올리면 도망 */}
          <button
            onMouseEnter={flee}
            style={{
              transition: 'left 0.12s ease-out, top 0.12s ease-out',
              ...noStyle,
            }}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold text-lg rounded-full shadow cursor-default"
          >
            싫어요
          </button>
        </div>
      </div>

      <Link
        to="/home"
        className="absolute bottom-6 text-pink-400 hover:text-pink-500 underline text-sm z-10"
      >
        ← 돌아가기
      </Link>
    </div>
  );
}
