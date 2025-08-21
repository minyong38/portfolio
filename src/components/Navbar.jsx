export default function Navbar() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#awards", label: "Awards" },
    { href: "#certs", label: "Certificates" },
    { href: "#exp", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 thin-sep backdrop-blur supports-[backdrop-filter]:bg-base/70">
      <div className="container-page h-12 flex items-center justify-between">
        <a href="#" className="text-white text-sm font-semibold">Minyong Park</a>
        <nav className="nav hidden sm:flex gap-5">
          {items.map(i => <a key={i.href} href={i.href}>{i.label}</a>)}
        </nav>
      </div>
    </header>
  );
}
