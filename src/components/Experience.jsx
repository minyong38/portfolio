import { Link } from 'react-router-dom';

export default function Experience() {
  const items = [
    {
      title: '화재 관제 시스템',
      date: '2024',
      desc: 'ESP32 + Flask + vue 기반 화재·재실 통합 관제. 영역/센서 매핑과 실시간 이벤트 처리, 관리 UI 구현.',
      to: '/fire-monitor',
    },
  ];
  return (
    <section id="exp" className="section">
      <div className="container-page">
        <div className="card p-4 sm:p-6">
          <h2 className="section-title text-white">프로젝트 : Projects</h2>
          <div className="space-y-4 sm:space-y-6 mt-3">
            {items.map((e, i) => (
              <div key={i} className="left-accent bg-[#1a1f26] border border-white/5 p-3 sm:p-5 rounded-lg">
                <div className="font-semibold text-sm sm:text-base" style={{ color: '#fff' }}>
                  {e.title}
                </div>
                <div className="date-blue mt-1 text-xs sm:text-sm text-cyan-100">{e.date}</div>
                <p className="text-xs sm:text-sm opacity-80 mt-2 text-gray-200">{e.desc}</p>
                {e.to && (
                  <div className="mt-3">
                    <Link to={e.to} className="btn text-xs sm:text-sm">자세히 보기</Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

