import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const START_DATE = new Date('2026-01-04T00:00:00');

const MILESTONES = [
  { label: '100일', days: 100 },
  { label: '200일', days: 200 },
  { label: '300일', days: 300 },
  { label: '1주년', days: 365 },
  { label: '500일', days: 500 },
  { label: '2주년', days: 730 },
];

const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  left: `${5 + Math.round((i * 73 + 17) % 90)}%`,
  delay: `${(i * 0.4) % 3}s`,
  size: `${1.2 + (i % 4) * 0.4}rem`,
  opacity: 0.15 + (i % 3) * 0.08,
}));

function getDayCount() {
  const now = new Date();
  const diff = now - START_DATE;
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

function getTimeComponents() {
  const now = new Date();
  const diff = now - START_DATE;
  const totalSec = Math.floor(diff / 1000);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { hours, minutes, seconds };
}

export default function SejungDday() {
  const [dayCount, setDayCount] = useState(getDayCount);
  const [time, setTime] = useState(getTimeComponents);

  useEffect(() => {
    const id = setInterval(() => {
      setDayCount(getDayCount());
      setTime(getTimeComponents());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const upcomingMilestones = MILESTONES
    .map(m => ({ ...m, daysLeft: m.days - dayCount }))
    .filter(m => m.daysLeft > 0)
    .slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col items-center justify-center select-none px-4">
      {/* floating hearts */}
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="absolute pointer-events-none sejung-float"
          style={{ left: h.left, top: `${10 + (i * 7) % 80}%`, fontSize: h.size, opacity: h.opacity, animationDelay: h.delay }}
        >
          💗
        </span>
      ))}

      <div className="z-10 text-center">
        <div className="text-5xl mb-4 sejung-heartbeat">💕</div>
        <p className="text-pink-400 text-sm mb-2">2026. 01. 04 ~</p>
        <h1 className="text-6xl sm:text-8xl font-black text-rose-500 mb-2 drop-shadow-sm">
          {dayCount}<span className="text-4xl sm:text-5xl">일째</span>
        </h1>
        <p className="text-pink-400 text-lg mb-8">
          {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
        </p>

        {/* upcoming milestones */}
        {upcomingMilestones.length > 0 && (
          <div className="space-y-3 mb-8">
            <p className="text-rose-400 font-semibold text-sm">다가오는 기념일</p>
            {upcomingMilestones.map(m => (
              <div key={m.label} className="bg-white/60 backdrop-blur rounded-2xl px-6 py-3 shadow-sm">
                <span className="text-rose-500 font-bold">{m.label}</span>
                <span className="text-pink-400 ml-3">D-{m.daysLeft}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/sejung" className="absolute bottom-6 text-pink-400 hover:text-pink-500 underline text-sm z-10">
        ← 돌아가기
      </Link>
    </div>
  );
}
