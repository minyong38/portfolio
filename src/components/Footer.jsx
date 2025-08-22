export default function Footer() {
  return (
    <footer className="pb-20 pt-6 text-xs sm:text-base">
      <div className="container-page footer-note text-center px-2">
        <div>© {new Date().getFullYear()} Portfolio. Created by Minyong Park</div>
        <div className="mt-1">“꾸준히 업뎃중”</div>
      </div>
    </footer>
  );
}
