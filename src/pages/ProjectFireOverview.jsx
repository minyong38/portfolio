import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

function Slide({ id, children, bg = "", className = "", patternStyle, footer }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`fire-slide snap-start min-h-screen relative flex items-center px-6 ${bg}`} style={patternStyle}>
      <div className={`max-w-page mx-auto w-full text-center slide-appear ${visible ? "in-view" : ""} ${className}`}>
        {children}
      </div>
      {footer && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6">
          {footer}
        </div>
      )}
    </section>
  );
}

export default function ProjectFireOverview() {
  const base = import.meta.env.BASE_URL || "/";
  const screenshots = [
    `${base}projects/fire/screenshots/shot-1.png`,
    `${base}projects/fire/screenshots/shot-2.png`,
  ];

  const slideIds = [
    "hero",
    "overview","features",
    "firmware","backend","frontend",
    "arch","ml",
    "challenges","results","learnings",
    "api","shots","video","stack","thanks"
  ];
  const slideMeta = [
    { id: "hero",       title: "Intro",           bgClass: "bg-gradient-to-br from-brand to-cyan-600" },
    { id: "overview",   title: "Overview",        pattern: 'rgba(255,255,255,.04)' },
    { id: "features",   title: "Features",        pattern: 'rgba(255,255,255,.03)' },
    { id: "firmware",   title: "Firmware",        pattern: 'rgba(255,255,255,.04)' },
    { id: "backend",    title: "Backend",         bgClass: "bg-[#0f1620]", pattern: 'rgba(255,255,255,.03)' },
    { id: "frontend",   title: "Frontend",        pattern: 'rgba(255,255,255,.04)' },
    { id: "arch",       title: "Architecture",    pattern: 'rgba(255,255,255,.04)' },
    { id: "ml",         title: "ML",              bgClass: "bg-[#0f1620]", pattern: 'rgba(255,255,255,.03)' },
    { id: "challenges", title: "Challenges",      pattern: 'rgba(255,255,255,.04)' },
    { id: "results",    title: "Results",         bgClass: "bg-[#0f1620]", pattern: 'rgba(255,255,255,.03)' },
    { id: "learnings",  title: "Learnings",       pattern: 'rgba(255,255,255,.04)' },
    { id: "api",        title: "API & Events",    pattern: 'rgba(255,255,255,.04)' },
    { id: "shots",      title: "Screenshots",     bgClass: "bg-[#0f1620]", pattern: 'rgba(255,255,255,.03)' },
    { id: "video",      title: "Demo Video",      pattern: 'rgba(255,255,255,.04)' },
    { id: "stack",      title: "Stack",           pattern: 'rgba(255,255,255,.04)' },
    { id: "thanks",     title: "Thanks",          bgClass: "bg-[#0f1620]", pattern: 'rgba(255,255,255,.03)' },
  ];
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [thumbs, setThumbs] = useState(Array(slideIds.length).fill(null));

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = slideIds.indexOf(e.target.id);
          if (idx >= 0) setActive(idx);
        }
      });
    }, { root: containerRef.current, threshold: 0.6 });
    const nodes = Array.from(document.querySelectorAll("section.fire-slide"));
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    const onScroll = () => {
      const items = el.querySelectorAll('.parallax-elm');
      items.forEach((node) => {
        const r = node.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const center = r.top + r.height / 2; const prog = (center - vh / 2) / vh;
        const offset = Math.max(-20, Math.min(20, prog * 40));
        node.style.setProperty('--py', `${offset.toFixed(1)}px`);
      });
    };
    onScroll(); el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSlide = (idx) => {
    const target = document.getElementById(slideIds[idx]);
    const container = containerRef.current;
    if (target && container) {
      const top = target.offsetTop - container.offsetTop;
      container.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const pattern = (color = 'rgba(255,255,255,.05)') => ({
    backgroundImage: `radial-gradient(${color} 1px, transparent 1.2px)`,
    backgroundSize: '22px 22px'
  });

  // Capture slide thumbnails (once on mount and when images load/resize)
  const captureThumbs = async (onlyIndex = null) => {
    const container = containerRef.current;
    if (!container) return;
    const ids = onlyIndex == null ? slideIds : [slideIds[onlyIndex]];
    const results = await Promise.all(
      ids.map(async (id) => {
        const el = document.getElementById(id);
        if (!el) return [id, null];
        // Make off-screen slide visible for capture (avoid opacity:0 from animations)
        const wrap = el.querySelector('.slide-appear');
        const prevClass = wrap ? wrap.className : '';
        const prevStyle = wrap ? wrap.getAttribute('style') : null;
        try {
          if (wrap) {
            wrap.classList.add('in-view');
            wrap.style.opacity = '1';
            wrap.style.transform = 'none';
          }
          const canvas = await html2canvas(el, {
            backgroundColor: null,
            scale: 0.2,
            useCORS: true,
            logging: false,
            scrollY: -window.scrollY,
          });
          const data = canvas.toDataURL('image/png');
          return [id, data];
        } catch (e) {
          return [id, null];
        } finally {
          if (wrap) {
            wrap.className = prevClass;
            if (prevStyle == null) wrap.removeAttribute('style'); else wrap.setAttribute('style', prevStyle);
          }
        }
      })
    );
    setThumbs((prev) => {
      const arr = [...prev];
      results.forEach(([id, data]) => {
        const idx = slideIds.indexOf(id);
        if (idx >= 0 && data) arr[idx] = data;
      });
      return arr;
    });
  };

  useEffect(() => {
    // initial capture after first paint (조금 더 여유를 줌)
    const t = setTimeout(() => captureThumbs(), 700);
    const onResize = () => { clearTimeout((onResize)._t); (onResize)._t = setTimeout(() => captureThumbs(), 350); };
    window.addEventListener('resize', onResize);
    // recapture when images load
    const imgs = Array.from((containerRef.current || document).querySelectorAll('img, video'));
    const onMediaLoad = () => { clearTimeout((onMediaLoad)._t); (onMediaLoad)._t = setTimeout(() => captureThumbs(), 300); };
    imgs.forEach(m => { m.addEventListener('load', onMediaLoad); m.addEventListener('loadeddata', onMediaLoad); });
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
      imgs.forEach(m => { m.removeEventListener('load', onMediaLoad); m.removeEventListener('loadeddata', onMediaLoad); });
    };
  }, []);

  // recapture the currently active slide (애니메이션 완료 후 갱신)
  useEffect(() => {
    const t = setTimeout(() => captureThumbs(active), 250);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <main ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory bg-[#0b111a] text-gray-100 relative sm:pl-56 xl:pl-64">
      {/* Left thumbnails nav (>= sm) */}
      <nav
        className="hidden sm:flex flex-col fixed left-4 top-6 z-40 w-40 lg:w-44 xl:w-48 overflow-y-auto overflow-x-hidden pr-1 thumbs-nav"
        style={{
          maxHeight: '900px', // 한 화면에 6~7개만 보이게
          minHeight: '400px'
        }}
      >
        {slideMeta.map((m, i) => (
          <button
            key={m.id}
            aria-label={`${m.title} slide`}
            onClick={() => scrollToSlide(i)}
            className={`thumb-card rounded-xl overflow-hidden border border-white/10 text-left group transition-all ${active===i ? 'ring-2 ring-white/60 scale-[1.02]' : 'opacity-80 hover:opacity-100'}`}
            style={{
              minHeight: '100px',
              maxHeight: '72px',
            }}
          >
            {thumbs[i] ? (
              <img src={thumbs[i]} alt={m.title}
                   className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full ${m.bgClass || ''}`} style={m.pattern ? pattern(m.pattern) : undefined}>
                <div className="bg-gradient-to-t from-black/35 to-transparent w-full h-full p-2 flex items-end">
                  <div className="text-[11px] font-semibold text-white/90 drop-shadow-sm truncate">{m.title}</div>
                </div>
              </div>
            )}
          </button>
        ))}
      </nav>
      {/* Dot nav for mobile only */}
      <nav className="flex sm:hidden flex-col gap-3 items-center fixed left-4 top-1/2 -translate-y-1/2 z-40">
        {slideIds.map((_, i) => (
          <button key={i} aria-label={`Go to slide ${i+1}`} onClick={() => scrollToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${active === i ? 'bg-white ring-2 ring-white/60 scale-110' : 'bg-white/40 hover:bg-white/70'}`} />
        ))}
      </nav>

      {/* Hero */}
      <Slide id="hero" bg="bg-gradient-to-br from-brand to-cyan-600" footer={<div className="scrollcue opacity-90"><span className="dot" />Scroll</div>}>
        <h1 className="parallax-elm text-white text-5xl sm:text-7xl font-extrabold tracking-tight">AI 기반 실시간 화재·재실 감지 통합 모니터링 시스템</h1>
        <div className="flex flex-wrap gap-2 justify-center mt-8 text-sm">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">Full‑stack</span>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">2025년 9월 ~ 10월</span>
        </div>
      </Slide>

      {/* Overview */}
      <Slide id="overview" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">프로젝트 개요</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mx-auto max-w-4xl">
          {/* 이모지 영역 */}
          <div className="flex flex-row sm:flex-col gap-6 sm:gap-8 items-center sm:items-start text-4xl">
            <span className="bg-white/10 rounded-full p-4">🛰️</span>
            <span className="bg-white/10 rounded-full p-4">🤖</span>
            <span className="bg-white/10 rounded-full p-4">🔗</span>
          </div>
          {/* 설명 영역 */}
          <div className="text-gray-200 text-xl leading-relaxed text-left">
            <div className="mb-3">
              <span className="font-bold text-white">문제점</span> <span className="ml-2">🚨</span><br />
              기존 화재경보기는 임계치 기반의 사후 대응과 인원 현황 파악의 한계가 있었습니다.
            </div>
            <div className="mb-3">
              <span className="font-bold text-white">솔루션</span> <span className="ml-2">💡</span><br />
              <b className="text-brand">🛰️ IoT 센서 데이터</b>, <b className="text-cyan-400">🤖 AI 예측 모델</b>, <b className="text-yellow-300">🔗 외부 재실 시스템 API</b>를 통합하여
              <br /><b>선제적 안전 관리</b>와 <b>실시간 시각화</b>가 가능한 중앙 관제 대시보드를 구축했습니다.
            </div>
            <div>
              <span className="font-bold text-white">성과</span> <span className="ml-2">🏆</span><br />
              실시간 데이터 기반의 <b>화재·재실 통합 모니터링</b>과 <b>즉각적 대응</b>이 가능해졌습니다.
            </div>
          </div>
        </div>
      </Slide>

      {/* Features */}
      <Slide id="features" bg="bg-[#0f1620]" patternStyle={pattern('rgba(255,255,255,.03)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">주요 기능</h2>
        <ul className="list-none mx-auto max-w-4xl space-y-5 text-gray-200 text-xl text-left">
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'60ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">📡</span>
            <div>
              <b className="text-brand">다중 센서 모니터링</b><br />
              ESP32 기반 노드에서 온도·습도·eCO2·TVOC·연기·CO 데이터를 1초 단위로 수집 및 실시간 시각화
            </div>
          </li>
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'140ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">🔥</span>
            <div>
              <b className="text-cyan-400">AI 기반 화재 예측</b><br />
              Random Forest로 위험도 예측(임계치 방식 대비 정밀)
            </div>
          </li>
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'220ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">👥</span>
            <div>
              <b className="text-yellow-300">재실자 감지 연동</b><br />
              Home Assistant API로 구역별 실시간 인원 현황 통합 표시
            </div>
          </li>
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'300ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">🖥️</span>
            <div>
              <b className="text-green-300">통합 관제 대시보드</b><br />
              센서 데이터·AI 결과·재실 현황을 단일 화면에서 확인
            </div>
          </li>
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'380ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">🗺️</span>
            <div>
              <b className="text-red-400">영역 매핑 & 경보</b><br />
              화재 발생 시 해당 영역 색상 빨간색으로 변경해 즉각 인지
            </div>
          </li>
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'460ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">⚙️</span>
            <div>
              <b className="text-purple-300">센서 관리 페이지</b><br />
              ESP/재실/유도등/영역 생성·편집 → DB 저장 → 대시보드 매핑
            </div>
          </li>
        </ul>
      </Slide>


      {/* Firmware / Edge */}
      <Slide id="firmware" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6 mt-0">펌웨어(ESP32)</h2>
        <ul className="list-none mx-auto max-w-4xl space-y-5 text-gray-200 text-xl text-left">
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'60ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">🌡️</span>
            <div>
              <b className="text-brand">센서 수집</b><br />
              온도/습도, eCO2/TVOC, 가스(MQ2) 등 주기 측정
            </div>
          </li>
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'140ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">🔉</span>
            <div>
              <b className="text-cyan-400">잡음 저감</b><br />
              이동평균·히스테리시스 적용, 임계치 사전 판정
            </div>
          </li>
          <li className="flex items-start gap-3 stagger-item" style={{animationDelay:'220ms'}}>
            <span className="text-3xl bg-white/10 rounded-full p-2">📶</span>
            <div>
              <b className="text-yellow-300">데이터 전송</b><br />
              Wi‑Fi 연결 복구/재시도, JSON POST로 서버 업링크
            </div>
          </li>
        </ul>
      </Slide>

      {/* Backend / DB */}
      <Slide id="backend" bg="bg-[#0f1620]" patternStyle={pattern('rgba(255,255,255,.03)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">백엔드 & 데이터</h2>
        <ul className="list-disc list-inside mx-auto max-w-4xl space-y-3 text-gray-200 text-xl">
          <li className="stagger-item" style={{animationDelay:'60ms'}}>Flask + Socket.IO: 수집 → 판정 → DB 저장 → 실시간 브로드캐스트</li>
          <li className="stagger-item" style={{animationDelay:'140ms'}}>엔드포인트: <code className="px-1 py-0.5 bg-white/10 rounded">POST /data</code>, <code className="px-1 py-0.5 bg-white/10 rounded">POST /occupancy</code>, <code className="px-1 py-0.5 bg-white/10 rounded">GET /latest</code>, <code className="px-1 py-0.5 bg-white/10 rounded">GET /stats</code></li>
          <li className="stagger-item" style={{animationDelay:'220ms'}}>테이블: <b>sensor_esp</b>(측정값), <b>fire_monitor_log</b>(최근 판정), <b>sensor_setting</b>(지도 매핑), <b>sensor_jasil</b>(재실)</li>
        </ul>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto max-w-5xl mt-5">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left text-sm text-gray-200">
{`// POST /occupancy
{
  "location": "meeting",
  "people": 3,
  "battery": 92
}`}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left text-sm text-gray-200">
{`// sensor_setting (예)
{
  "type": "area",
  "name": "회의실",
  "x": 360, "y": 36, "width": 420, "height": 220,
  "map_id": "DF"
}`}
          </div>
        </div>
      </Slide>

      {/* Frontend */}
      <Slide id="frontend" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">프론트엔드</h2>
        <ul className="list-disc list-inside mx-auto max-w-4xl space-y-3 text-gray-200 text-xl">
          <li className="stagger-item" style={{animationDelay:'60ms'}}>슬라이드 관제 개요 페이지(현재 화면): 설명/다이어그램/스크린샷/영상</li>
          <li className="stagger-item" style={{animationDelay:'140ms'}}>관리 UI: 영역/센서/유도등 매핑 · 좌표 편집, DB 동기화</li>
          <li className="stagger-item" style={{animationDelay:'220ms'}}>실시간 뷰: Socket.IO 구독으로 상태 갱신, 위험 존 강조</li>
        </ul>
      </Slide>

      {/* Architecture */}
      <Slide id="arch" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">아키텍처</h2>
        <p className="parallax-elm text-gray-200 text-xl mx-auto max-w-4xl">ESP32 → 백엔드(수집/판정/저장) → 프론트 관제 대시보드(실시간 표출). 영역/센서 매핑으로 화재 발생 시 해당 존을 강조 표시하며, 유도등 연동·대피 경로 안내로 확장 가능하도록 설계했습니다.</p>
        <div className="mt-4 text-gray-200">
          <div className="font-semibold mb-1">데이터 파이프라인</div>
          <ul className="list-disc list-inside mx-auto max-w-3xl space-y-2 text-lg">
            <li className="stagger-item" style={{animationDelay:'60ms'}}>화재 센서: ESP32 → Flask <code className="px-1 py-0.5 bg-white/10 rounded">POST /data</code> → Socket.IO <code className="px-1 py-0.5 bg-white/10 rounded">sensor_data</code></li>
            <li className="stagger-item" style={{animationDelay:'140ms'}}>재실자 센서: Home Assistant(HA) Zigbee → Flask <code className="px-1 py-0.5 bg-white/10 rounded">POST /occupancy</code> → Socket.IO <code className="px-1 py-0.5 bg-white/10 rounded">occupancy_update</code></li>
          </ul>
        </div>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 flex justify-center">
          <img src={`${base}projects/fire/diagram.png`} alt="시스템 아키텍처" className="parallax-elm block w-full h-auto max-w-[900px] md:max-w-[720px] object-contain" loading="lazy" decoding="async" onError={(e)=>{e.currentTarget.style.display='none';}} />
        </div>
      </Slide>

      {/* ML */}
      <Slide id="ml" bg="bg-[#0f1620]" patternStyle={pattern('rgba(255,255,255,.03)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">ML 모델링</h2>
        <ul className="list-disc list-inside mx-auto max-w-3xl space-y-4 text-gray-200 text-xl">
          <li className="stagger-item" style={{animationDelay:'60ms'}}>scikit‑learn RandomForest 분류기(온도/습도/eCO2/TVOC/GAS 특징)</li>
          <li className="stagger-item" style={{animationDelay:'140ms'}}>정상 데이터: 실제 센서 로그, 화재 데이터: 블렌딩 기법으로 합성</li>
          <li className="stagger-item" style={{animationDelay:'220ms'}}>검증 후 joblib으로 배포, 서버에서 즉시 추론하여 확률 포함 결과 브로드캐스트</li>
        </ul>
      </Slide>

      {/* Challenges */}
      <Slide id="challenges" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">어려움과 해결</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto max-w-5xl text-left text-gray-200 text-lg">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="font-semibold text-white mb-2">이종 시스템 통합</div>
            <p className="mb-2"><b className="text-white">문제:</b> 화재(ESP32)와 재실(HA)이 서로 다른 플랫폼</p>
            <p><b className="text-white">해결:</b> Flask를 <b>중앙 허브</b>로 설계해 모든 데이터를 집약, 프런트는 Flask와만 통신</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="font-semibold text-white mb-2">실시간 데이터 처리</div>
            <p className="mb-2"><b className="text-white">문제:</b> 초 단위 데이터/예측 결과를 지연 없이 표출</p>
            <p><b className="text-white">해결:</b> WebSocket 아키텍처 적용, 끊김 없는 실시간 대시보드 구현</p>
          </div>
        </div>
      </Slide>

      {/* Results */}
      <Slide id="results" bg="bg-[#0f1620]" patternStyle={pattern('rgba(255,255,255,.03)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">핵심 성과</h2>
        <ul className="list-disc list-inside mx-auto max-w-4xl space-y-4 text-gray-200 text-xl">
          <li className="stagger-item" style={{animationDelay:'60ms'}}>IoT–AI–웹을 End‑to‑End로 직접 설계/구현</li>
          <li className="stagger-item" style={{animationDelay:'140ms'}}>센서 관리 → DB 저장 → 대시보드 매핑 → 실시간 관제 전체 데이터 플로우 구축</li>
          <li className="stagger-item" style={{animationDelay:'220ms'}}>Full‑stack 역량 확보(하드웨어·백엔드/DB·AI·프론트)</li>
          <li className="stagger-item" style={{animationDelay:'300ms'}}>확장성: 유도등 제어 및 대피 경로 안내 기능으로 자연 확장 가능</li>
        </ul>
      </Slide>

      {/* Learnings */}
      <Slide id="learnings" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">배운 점</h2>
        <ul className="list-disc list-inside mx-auto max-w-4xl space-y-4 text-gray-200 text-xl">
          <li className="stagger-item" style={{animationDelay:'60ms'}}>IoT 환경의 실시간 데이터 처리/비동기 통신 아키텍처(WebSocket) 경험</li>
          <li className="stagger-item" style={{animationDelay:'140ms'}}>이종 시스템 통합 시 API 표준화와 중앙 허브 설계의 중요성</li>
          <li className="stagger-item" style={{animationDelay:'220ms'}}>AI 모델은 서비스 맥락의 데이터 반영이 성능에 직결됨을 체감</li>
        </ul>
      </Slide>

      {/* API & Events */}
      <Slide id="api" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">API & 이벤트</h2>
        <ul className="list-disc list-inside mx-auto max-w-3xl space-y-4 text-gray-200 text-xl">
          <li><code className="px-1 py-0.5 bg-white/10 rounded">POST /data</code> 센서 수신 및 저장</li>
          <li><code className="px-1 py-0.5 bg-white/10 rounded">POST /occupancy</code> HA → 재실자 수 수신 및 브로드캐스트</li>
          <li><code className="px-1 py-0.5 bg-white/10 rounded">GET /latest</code>, <code className="px-1 py-0.5 bg-white/10 rounded">GET /stats</code></li>
          <li>Socket.IO: <code className="px-1 py-0.5 bg-white/10 rounded">sensor_data</code>, <code className="px-1 py-0.5 bg-white/10 rounded">occupancy_update</code>, <code className="px-1 py-0.5 bg-white/10 rounded">fire_alert</code></li>
        </ul>
      </Slide>

      {/* Screenshots */}
      <Slide id="shots" bg="bg-[#0f1620]" patternStyle={pattern('rgba(255,255,255,.03)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">스크린샷</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {screenshots.map((src, i) => (
            <img key={i} src={src} alt={`화면 스크린샷 ${i+1}`} className="w-full h-auto max-w-[520px] md:max-w-[640px] object-contain rounded-lg border border-white/10 bg-white/5 mx-auto" loading="lazy" decoding="async" onError={(e)=>{e.currentTarget.style.display='none';}} />
          ))}
        </div>
      </Slide>

      {/* Video */}
      <Slide id="video" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">데모 영상</h2>
        <video controls className="w-full rounded-lg border border-white/10 bg-black" onError={(e)=>{e.currentTarget.style.display='none';}}>
          <source src={`${base}projects/fire/demo.mp4`} type="video/mp4" />
        </video>
      </Slide>

      {/* Stack */}
      <Slide id="stack" patternStyle={pattern('rgba(255,255,255,.04)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-6">기술 스택</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto max-w-5xl text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-2">하드웨어</h3>
            <p className="text-gray-200">ESP32‑C3, SHT31, SGP30, MQ‑2, MQ‑7</p>
            <h3 className="text-white font-semibold mt-4 mb-2">개발환경</h3>
            <p className="text-gray-200">VS Code + PlatformIO (빌드/USB 업로드)</p>
            <h3 className="text-white font-semibold mt-4 mb-2">백엔드</h3>
            <p className="text-gray-200">Python, Flask, Flask‑SocketIO, MySQL, SQLAlchemy</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-2">AI/ML</h3>
            <p className="text-gray-200">Scikit‑learn(Random Forest), Pandas, NumPy</p>
            <h3 className="text-white font-semibold mt-4 mb-2">프론트엔드</h3>
            <p className="text-gray-200">Vue(Nuxt), Chart.js, Axios, Socket.IO‑Client</p>
            <h3 className="text-white font-semibold mt-4 mb-2">외부 연동</h3>
            <p className="text-gray-200">Home Assistant REST API</p>
          </div>
        </div>
      </Slide>

      {/* Thanks */}
      <Slide id="thanks" bg="bg-[#0f1620]" patternStyle={pattern('rgba(255,255,255,.03)')}>
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold">감사합니다</h2>
        <p className="text-gray-300 mt-4 text-xl">상세 문의는 메일로 연락 주세요.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/" className="btn">홈으로</Link>
          <Link to="/home" className="btn">Main Home</Link>
        </div>
      </Slide>
    </main>
  );
}
