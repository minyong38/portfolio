import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const ALL_APPS_MAC = [
  { name: "Gallery", url: "/gallery", cat: "Media", icon: "icons/photo.png" },
  { name: "Maps", url: "/maps", cat: "Tools", icon: "icons/maps.png" },
  { name: "Music", url: "/music", cat: "Media", icon: "icons/music.png" },
  { name: "Instagram", url: "https://www.instagram.com/meee__nyong/", cat: "Social", icon: "icons/instagram.png" },
  { name: "Guestbook", url: "/guestbook", cat: "Social", icon: "icons/guestbook.png" },
];

const ALL_APPS_WIN = [
  { name: "Photos", url: "/gallery", cat: "Media", icon: "icons/win/photos.png" },
  { name: "Maps", url: "/maps", cat: "Tools", icon: "icons/win/maps.png" },
  { name: "Music", url: "/music", cat: "Media", icon: "icons/win/music.png" },
  { name: "Instagram", url: "https://www.instagram.com/meee__nyong/", cat: "Social", icon: "icons/win/instagram.png" },
  { name: "Guestbook", url: "/guestbook", cat: "Social", icon: "icons/win/guestbook.png" },
];

export default function MainHome() {
  const [os, setOs] = useState("mac"); // "mac" | "windows"
  return (
    <UnifiedHome
      os={os}
      onToggle={() => setOs(os === "mac" ? "windows" : "mac")}
    />
  );
}

function UnifiedHome({ os, onToggle }) {
  const [q, setQ] = useState("");
  const [hoverUrl, setHoverUrl] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const apps = useMemo(() => {
    const query = q.trim().toLowerCase();
    const data = os === "mac" ? ALL_APPS_MAC : ALL_APPS_WIN;
    return query ? data.filter(a => a.name.toLowerCase().includes(query)) : data;
  }, [q, os]);

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

  // OS별 스타일
  const isMac = os === "mac";
  const bgClass = isMac
    ? "bg-home-gradient"
    : "bg-gradient-to-br from-[#f6f6f6] to-[#eaeaea]";
  const textClass = isMac ? "text-white/90" : "text-black/80";
  const panelBg = isMac
    ? "glass-panel"
    : "rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200";
  const panelShadow = isMac
    ? ""
    : "shadow-[0_20px_60px_rgba(0,0,0,0.15)]";
  const addressBg = isMac
    ? "bg-white/70 text-black/80"
    : "bg-white text-black/80 border border-gray-200";
  const inputBg = isMac
    ? "bg-white/90 text-black"
    : "bg-white text-black border border-gray-200";
  const searchRing = isMac
    ? "focus:ring-brand/60"
    : "focus:ring-blue-400";
  const gridText = isMac ? "text-white/90" : "text-black/80";
  const footerText = isMac ? "text-white/80" : "text-black/60";
  const footerLink = isMac
    ? "text-white/90 hover:text-white"
    : "text-black/70 hover:text-black";

  return (
    <main className={`min-h-screen relative flex flex-col ${bgClass}`}>
      {/* OS 토글 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onToggle}
          className={`group flex items-center w-28 sm:w-36 h-10 rounded-full ${
            isMac ? "bg-white/90 text-black" : "bg-white text-black"
          } shadow-lg px-1 transition-all duration-300 text-sm sm:text-base`}
          aria-label={isMac ? "Switch to Windows" : "Switch to Mac"}
        >
          <span className="inline-block w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-400 shadow" />
          <span className="flex-1 text-center font-medium">
            {isMac ? "Mac" : "Windows"}
          </span>
        </button>
      </div>

      {/* 중앙 패널 */}
      <section className="flex-1 w-full flex items-center justify-center py-4 sm:py-10">
        <div
          className={`${panelBg} ${panelShadow} w-full max-w-[1280px] mx-2 sm:mx-auto`}
        >
          {/* 상단 바 (Mac: 브라우저바, Win: 타이틀바+주소창) */}
          <div className="flex flex-col gap-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-6 pt-4 sm:pt-6">
              {isMac ? (
                <>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* 주소+검색창 합쳐진 형태 */}
                  <div
                    className={`flex-1 h-10 sm:h-12 rounded-full ${addressBg} flex items-center px-3 sm:px-5 text-base sm:text-lg shadow-inner`}
                  >
                    <span className="opacity-70 mr-2">https://</span>
                    <span className="truncate">{hoverUrl || "select an app…"}</span>
                  </div>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      value={q}
                      onChange={e => setQ(e.target.value)}
                      placeholder="Search ( / )"
                      className={`h-10 sm:h-12 w-36 sm:w-80 rounded-full px-4 sm:px-6 text-base sm:text-lg outline-none ${inputBg} ${searchRing} placeholder-black/50`}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* 윈도우: 타이틀바 + 주소창 */}
                  <div className="flex flex-col gap-0 flex-1">
                    {/* 타이틀바 */}
                    <div className="flex items-center h-8 sm:h-9 px-2 sm:px-3 bg-[#ededed] border-t border-x border-b-0 border-gray-300 rounded-t-xl select-none">
                      <img src="/icons/win/edge.png" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" alt="edge" />
                      <span className="text-[13px] sm:text-[15px] text-black/80 font-medium flex-1 truncate">Meenyong Portfolio</span>
                      <div className="flex items-center gap-0.5 sm:gap-1 ml-2">
                        <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded transition">
                          <svg width="16" height="16"><rect x="3" y="12" width="10" height="2" rx="1" fill="#222"/></svg>
                        </button>
                        <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded transition">
                          <svg width="16" height="16"><rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="#222" strokeWidth="1.5"/></svg>
                        </button>
                        <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-red-500 rounded transition">
                          <svg width="16" height="16"><line x1="4" y1="4" x2="12" y2="12" stroke="#222" strokeWidth="1.5"/><line x1="12" y1="4" x2="4" y2="12" stroke="#222" strokeWidth="1.5"/></svg>
                        </button>
                      </div>
                    </div>
                    {/* 주소창 */}
                    <div className="flex items-center h-9 sm:h-11 rounded-b-xl bg-white border-x border-b border-gray-300 px-2 sm:px-4 text-[13px] sm:text-[15px] shadow-inner">
                      <svg width="18" height="18" fill="none" className="mr-2 opacity-70"><rect x="5" y="8" width="8" height="5" rx="1" fill="#bbb"/><rect x="7" y="5" width="4" height="4" rx="2" fill="#bbb"/></svg>
                      <span className="font-semibold text-black mr-1 truncate">{hoverUrl || "localhost:5173/portfolio/home"}</span>
                      <svg width="18" height="18" fill="none" className="ml-2 mr-1 opacity-60"><path d="M9 2l2.09 4.24 4.68.68-3.39 3.3.8 4.66L9 12.77l-4.18 2.2.8-4.66-3.39-3.3 4.68-.68L9 2z" fill="#ffd700"/></svg>
                      <svg width="18" height="18" fill="none" className="ml-auto mr-2 opacity-60"><circle cx="9" cy="9" r="7" stroke="#bbb" strokeWidth="2"/><circle cx="9" cy="9" r="2" fill="#bbb"/></svg>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center ml-1">
                        <svg width="18" height="18" fill="none"><circle cx="9" cy="7" r="3" fill="#fff"/><rect x="4" y="11" width="10" height="5" rx="2.5" fill="#fff"/></svg>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* 앱 그리드 */}
          <div className="px-2 sm:px-16 pb-8 sm:pb-16 pt-6 sm:pt-10">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-8 sm:gap-x-16 sm:gap-y-16 justify-items-center">
              {apps.map((app, idx) => {
                const base = import.meta.env.BASE_URL;
                const external = app.url.startsWith("http");

                const handleMouseEnter = () => {
                  setHoverUrl(
                    external
                      ? app.url.replace(/^https?:\/\//, "")
                      : app.name
                  );
                };
                const handleMouseLeave = () => setHoverUrl("");

                const iconBox =
                  "w-16 h-16 sm:w-28 sm:h-28 rounded-xl bg-white/80 border border-gray-200 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.1)]";

                const iconImg =
                  "w-12 h-12 sm:w-24 sm:h-24 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110";

                if (!external) {
                  return (
                    <Link
                      key={app.name}
                      to={app.url}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="flex flex-col items-center space-y-2 sm:space-y-4 group"
                      style={{ transition: "all 0.3s" }}
                    >
                      <div className={iconBox}>
                        <img
                          src={`${base}${app.icon}`}
                          alt={app.name}
                          className={iconImg}
                        />
                      </div>
                      <div className={`text-[13px] sm:text-[15px] md:text-[16px] ${gridText}`}>
                        {app.name}
                      </div>
                    </Link>
                  );
                }

                return (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex flex-col items-center space-y-2 sm:space-y-4 group"
                    style={{ transition: "all 0.3s" }}
                  >
                    <div className={iconBox}>
                      <img
                        src={`${base}${app.icon}`}
                        alt={app.name}
                        className={iconImg}
                      />
                    </div>
                    <div className={`text-[13px] sm:text-[15px] md:text-[16px] ${gridText}`}>
                      {app.name}
                    </div>
                  </a>
                );
              })}

              {apps.length === 0 && (
                <div
                  className={`col-span-full text-center py-10 sm:py-16 ${
                    isMac ? "text-white/80" : "text-black/60"
                  }`}
                >
                  No results
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 푸터 */}
      <footer
        className={`pb-4 text-center text-xs sm:text-[13px] md:text-[14px] ${footerText}`}
      >
        <div>© {new Date().getFullYear()} Minyong Park · Main Home</div>
        <div className="mt-2 sm:mt-3">
          <Link to="/" className={`underline ${footerLink}`}>
            ← Back to Portfolio
          </Link>
        </div>
      </footer>
    </main>
  );
}
