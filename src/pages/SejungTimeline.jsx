import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MEMORIES = [
  { date: '2026-01-03', title: '처음 만난 날 💕', desc: '신사동 동녘 보쌈 진짜 맛있었음!' },
  { date: '2026-01-04', title: '사귄날 💗', desc: '영종도 바다 앞에서 박미뇽이 고백함 ㅋ' },
  { date: '2026-01-07', title: '삼겹살 데이트 🥓', desc: '세정이가 삼겹살 사준 날! 인생네컷도 처음 찍음' },
  { date: '2026-01-10', title: '영화 데이트 🎬', desc: '용산에서 "만약에 우리" 봤어요' },
  { date: '2026-01-13', title: '넷플릭스 데이트 📺', desc: '세정이가 퇴근하고 강남 날라옴! 룸카페에서 넷플' },
  { date: '2026-01-16', title: '영흥도 풀빌라 1박2일 🏖️', desc: '바베큐하고 불멍하면서 마시멜로 구워먹음!' },
  { date: '2026-01-21', title: '또 강남 💨', desc: '세정이가 퇴근하고 또 강남 날라옴!' },
  { date: '2026-01-24', title: '파주 나들이 🍙', desc: '세정이 파주 와서 운정김밥 먹은 날' },
  { date: '2026-01-27', title: '꽃다발 선물 💐', desc: '미뇽이가 꽃 사줌! 강남에서 뼈찜도 먹음' },
  { date: '2026-01-28', title: '피자 데이트 🍕', desc: '강남에서 또 만났어 세정이 피자 먹음' },
  { date: '2026-01-31', title: '스노우 파크 ⛷️', desc: '같이 스키장 간 날!' },
  { date: '2026-02-07', title: '1주일 만에 💕', desc: '1주일 만에 만나서 너무 애틋했어 ㅠㅠ 세정이가 강남 날라옴' },
  { date: '2026-02-08', title: '아쿠아리움 🐠', desc: '코엑스 아쿠아리움 다녀옴!' },
  { date: '2026-02-09', title: '3일 연속 데이트 🎉', desc: '3일 연속으로 만남! 이세정 강남으로 날라옴' },
  { date: '2026-02-14', title: '발렌타인 드라이브 🚗', desc: '의왕으로 드라이브 간 날!' },
  { date: '2026-02-16', title: '용인 데이트 🥩', desc: '미뇽이 용인 간 날! 고기 푸파에서 먹음' },
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
