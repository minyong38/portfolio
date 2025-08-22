export default function Certificates() {
  const certs = [
    { name: "1종 보통", date: "2022.07", org: "자동차 면혀" },
    { name: "정보처리기사", date: "2025.12", org: "국가 공인 자격증" },
  ];
  return (
    <section id="certs" className="section">
      <div className="container-page">
        <div className="card p-4 sm:p-6 bg-[#1a1f26]">
          <h2 className="section-title text-white">자격증 : Certificates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-3">
            {certs.map((c,i)=>(
              <div key={i} className="cert rounded-lg p-3 sm:p-4 bg-[#23272f]">
                <div
                  className="font-semibold text-sm sm:text-base"
                  style={{ color: "#fff" }}
                >
                  {c.name}
                </div>
                <div className="date-blue text-xs sm:text-sm text-cyan-100">{c.date}</div>
                <div className="text-xs sm:text-sm opacity-80 text-gray-200">{c.org}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
