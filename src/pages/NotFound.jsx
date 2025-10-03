import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="section">
        <div className="container-page">
          <div className="card p-8 text-center">
            <h1 className="text-2xl text-white font-semibold">404</h1>
            <p className="mt-2 opacity-80">페이지를 찾을 수 없습니다.</p>
            <a href="/" className="btn mt-6">Back to Home</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

