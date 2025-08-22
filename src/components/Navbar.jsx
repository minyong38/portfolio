import React from "react";

export default function Navbar() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#awards", label: "Awards" },
    { href: "#certs", label: "Certificates" },
    { href: "#exp", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];
  // 모바일 메뉴 상태
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 thin-sep backdrop-blur supports-[backdrop-filter]:bg-base/70">
      <div className="container-page h-12 flex items-center justify-between px-3 sm:px-0">
        <a href="#" className="text-white text-sm font-semibold">Minyong Park</a>
        {/* 데스크탑 메뉴 */}
        <nav className="nav hidden sm:flex gap-5">
          {items.map(i => <a key={i.href} href={i.href}>{i.label}</a>)}
        </nav>
        {/* 모바일 메뉴 버튼 */}
        <button
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded hover:bg-white/10 transition"
          onClick={() => setOpen(v => !v)}
          aria-label="메뉴 열기"
        >
          <svg width="24" height="24" fill="none">
            <rect x="4" y="7" width="16" height="2" rx="1" fill="#fff"/>
            <rect x="4" y="15" width="16" height="2" rx="1" fill="#fff"/>
          </svg>
        </button>
        {/* 모바일 메뉴 드롭다운 */}
        {open && (
          <div className="absolute top-12 right-3 w-40 bg-[#222] rounded-lg shadow-lg flex flex-col py-2 z-50 sm:hidden animate-fade-in">
            {items.map(i => (
              <a
                key={i.href}
                href={i.href}
                className="px-4 py-2 text-white hover:bg-white/10 rounded transition"
                onClick={() => setOpen(false)}
              >
                {i.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
