import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/** -------------------------
 *  Mac 레이아웃 (요청하신 버전 그대로 유지, 그리드 크기 확대)
 *  ------------------------- */
const ALL_APPS_MAC = [
  { name: "Gallery", url: "#", cat: "Media", icon: "icons/photo.png" },
  { name: "Maps", url: "#", cat: "Tools", icon: "icons/maps.png" },
  { name: "Instagram", url: "https://instagram.com/", cat: "Social", icon: "icons/instagram.png" },
  { name: "Music", url: "#", cat: "Media", icon: "icons/music.png" },
];

/** -------------------------s
 *  Windows 레이아웃 전용 데이터 (샘플)
 *  ------------------------- */
const ALL_APPS_WIN = [
  { name: "Photos", url: "#", cat: "Media", icon: "icons/win/photos.png" },
  { name: "Maps", url: "#", cat: "Tools", icon: "icons/win/maps.png" },
  { name: "Instagram", url: "https://instagram.com/", cat: "Social", icon: "icons/win/instagram.png" },
  { name: "Music", url: "#", cat: "Media", icon: "icons/win/music.png" },
];

export default function MainHome() {
  const [os, setOs] = useState("mac"); // "mac" | "windows"

  return os === "mac" ? <MacHome onToggle={() => setOs("windows")} /> : <WindowsHome onToggle={() => setOs("mac")} />;
}

/** -------------------------
 *  Mac 버전
 *  ------------------------- */
function MacHome({ onToggle }) {
  const [q, setQ] = useState("");
  const [hoverUrl, setHoverUrl] = useState("");
  const inputRef = useRef(null);

  const apps = useMemo(() => {
    const query = q.trim().toLowerCase();
    return query ? ALL_APPS_MAC.filter(a => a.name.toLowerCase().includes(query)) : ALL_APPS_MAC;
  }, [q]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQ("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen relative bg-home-gradient">
      {/* OS 토글: Mac → Windows */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={onToggle}
          className="group flex items-center w-36 h-10 rounded-full bg-white/90 text-black shadow-lg px-1 transition-all duration-300"
          aria-label="Switch to Windows"
        >
          <span className="inline-block w-8 h-8 rounded-full bg-neutral-400 shadow translate-x-0" />
          <span className="flex-1 text-center font-medium">Mac</span>
        </button>
      </div>

      {/* 중앙 패널 */}
      <section className="min-h-screen w-full flex items-center justify-center py-14">
        <div className="glass-panel w-[min(1280px,95vw)]">
          {/* 상단 브라우저바 + 검색 */}
          <div className="flex items-center gap-3 px-6 pt-6">
            <div className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 h-12 rounded-full bg-white/70 text-black/80 backdrop-blur-sm flex items-center px-5 text-lg shadow-inner">
              <span className="opacity-70 mr-2">https://</span>
              <span className="truncate">{hoverUrl || "select an app…"}</span>
            </div>

            <div className="relative">
              <input
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search ( / )"
                className="h-12 w-80 rounded-full bg-white/90 text-black px-6 text-lg outline-none focus:ring-2 focus:ring-brand/60 placeholder-black/50"
              />
            </div>
          </div>

          {/* 앱 그리드 (크게 확대) */}
          <div className="px-16 pb-16 pt-10">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-16 gap-y-16 justify-items-center">
              {apps.map(app => {
                const base = import.meta.env.BASE_URL;
                const external = app.url.startsWith("http");
                return (
                  <a
                    key={app.name}
                    href={app.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    onMouseEnter={() => setHoverUrl(app.url.replace(/^https?:\/\//, ""))}
                    onMouseLeave={() => setHoverUrl("")}
                    className="flex flex-col items-center space-y-4"
                  >
                    
                    <img src={`${base}${app.icon}`} alt={app.name}
                      className="w-24 h-24 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.style.fontSize = '32px';
                        fallback.textContent = '❔';
                        e.currentTarget.parentElement?.appendChild(fallback);
                      }}
                    />
                    <div className="text-[15px] sm:text-[16px] text-white/90">{app.name}</div>
                  </a>
                );
              })}

              {apps.length === 0 && (
                <div className="col-span-full text-center text-white/80 py-16">No results</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 푸터 */}
      <footer className="pb-10 text-center text-white/80 text-[13px] sm:text-[14px]">
        <div>© {new Date().getFullYear()} Minyong Park · Main Home</div>
        <div className="mt-3">
          <Link to="/" className="underline text-white/90 hover:text-white">← Back to Portfolio</Link>
        </div>
      </footer>
    </main>
  );
}

/** -------------------------
 *  Windows 버전 (맥 기준과 같은 위치에 탭바+주소/검색 포함, 스타일만 윈도우)
 *  ------------------------- */
function WindowsHome({ onToggle }) {
  const [q, setQ] = useState("");
  const [hoverUrl, setHoverUrl] = useState("");
  const inputRef = useRef(null);

  const apps = useMemo(() => ALL_APPS_WIN, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQ("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-[#f6f6f6] to-[#eaeaea]">
      {/* OS 토글 */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={onToggle}
          className="group flex items-center w-36 h-10 rounded-full bg-white text-black shadow px-1"
          aria-label="Switch to Mac"
        >
          <span className="inline-block w-8 h-8 rounded-full bg-neutral-400 shadow" style={{ transform: "translateX(104px)" }} />
          <span className="flex-1 text-center font-medium">Windows</span>
        </button>
      </div>

      {/* 중앙 패널 (맥과 동일한 폭/여백) */}
      <section className="min-h-screen w-full flex items-center justify-center py-14">
        <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-[min(1280px,95vw)]">
          {/* 윈도우 탭바 */}
          <div className="flex items-center justify-between h-10 px-4 bg-[#f3f3f3] border-b border-gray-300 rounded-t-3xl">
            <div className="flex items-center space-x-2">
              <img src="/icons/win/edge.png" className="w-4 h-4" alt="edge" />
              <span className="text-sm text-black/90">Vite + React</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 text-sm">
              <button aria-label="minimize">—</button>
              <button aria-label="maximize">▢</button>
              <button aria-label="close">×</button>
            </div>
          </div>

          {/* 주소창 + 검색 (윈도우 톤) */}
          <div className="flex items-center gap-3 px-6 pt-6">
            <div className="flex-1 h-12 rounded-lg bg-white text-black/80 flex items-center px-5 text-lg shadow-inner border border-gray-200">
              <span className="opacity-60 mr-2">https://</span>
              <span className="truncate">{hoverUrl || "select an app…"}</span>
            </div>
            <input
              ref={inputRef}
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search ( / )"
              className="h-12 w-80 rounded-lg bg-white text-black px-6 text-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50 border border-gray-200"
            />
          </div>

          {/* 앱 그리드 (맥 기준과 같은 배치로 확대) */}
          <div className="px-16 pb-16 pt-10">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-16 gap-y-16 justify-items-center">
              {apps.map(app => {
                const base = import.meta.env.BASE_URL;
                const external = app.url.startsWith("http");
                return (
                  <a
                    key={app.name}
                    href={app.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    onMouseEnter={() => setHoverUrl(app.url.replace(/^https?:\/\//, ""))}
                    onMouseLeave={() => setHoverUrl("")}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className="w-28 h-28 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                      <img src={`${base}${app.icon}`} alt={app.name} 
                        className="w-24 h-24 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = document.createElement('span');
                          fallback.style.fontSize = '32px';
                          fallback.textContent = '❔';
                          e.currentTarget.parentElement?.appendChild(fallback);
                        }}
                      />
                    </div>
                    <div className="text-[15px] sm:text-[16px] text-black/80">{app.name}</div>
                  </a>
                );
              })}

              {apps.length === 0 && (
                <div className="col-span-full text-center text-black/60 py-16">No results</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 푸터 (윈도우톤) */}
      <footer className="pb-8 text-center text-black/60 text-[12px] sm:text-[13px]">
        <div>© {new Date().getFullYear()} Minyong Park · Main Home</div>
        <div className="mt-2">
          <Link to="/" className="underline text-black/70 hover:text-black">← Back to Portfolio</Link>
        </div>
      </footer>
    </main>
  );
}
