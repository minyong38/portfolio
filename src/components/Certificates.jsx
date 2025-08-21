export default function Certificates() {
  const certs = [
    { name: "1종 보통", date: "2022.07", org: "자동차 면혀" },
    { name: "정보처리기사", date: "2025.12", org: "국가 공인 자격증" },
  ];
  return (
    <section id="certs" className="section">
      <div className="container-page">
        <div className="card p-6">
          <h2 className="section-title">자격증 : Certificates</h2>

          <div className="grid sm:grid-cols-2 gap-6 mt-3">
            {certs.map((c,i)=>(
              <div key={i} className="cert">
                <div className="text-white font-semibold">{c.name}</div>
                <div className="date-blue">{c.date}</div>
                <div className="text-sm opacity-80">{c.org}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
