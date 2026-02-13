import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MEMORIES = [
  { date: '2026-01-04', title: '사귄날 💗', desc: '영종도 가서 박미뇽이 고백함 ㅋ.' },
  { date: '2026-01-05', title: '두번째 데이트 🍽️', desc: '오디였더랑 ㅎㅎ ' },

];

function TimelineCard({ memory, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sejung-fade-in');
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`opacity-0 flex items-start gap-4 ${isLeft ? '' : 'flex-row-reverse'}`}>
      {/* card */}
      <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md max-w-xs w-full">
        <p className="text-xs text-pink-400 font-semibold mb-1">{memory.date}</p>
        <h3 className="text-rose-500 font-bold text-lg mb-1">{memory.title}</h3>
        <p className="text-pink-600/80 text-sm leading-relaxed">{memory.desc}</p>
      </div>
      {/* dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow" />
        {index < MEMORIES.length - 1 && <div className="w-0.5 h-16 bg-rose-200" />}
      </div>
      {/* spacer */}
      <div className="max-w-xs w-full hidden sm:block" />
    </div>
  );
}

export default function SejungTimeline() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 px-4 py-16 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl mb-3">📸</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-2">우리의 추억</h1>
          <p className="text-pink-400">소중한 순간들을 기록해요</p>
        </div>

        <div className="space-y-2">
          {MEMORIES.map((m, i) => (
            <TimelineCard key={i} memory={m} index={i} />
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link to="/sejung" className="text-pink-400 hover:text-pink-500 underline text-sm">
          ← 돌아가기
        </Link>
      </div>
    </div>
  );
}
