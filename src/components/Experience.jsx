export default function Experience() {
  const items = [
    {
      title: "없움 ㅠ..",
    },
  ];
  return (
    <section id="exp" className="section">
      <div className="container-page">
        <div className="card p-4 sm:p-6">
          <h2 className="section-title text-white">연구 경험 : Experience</h2>
          <div className="space-y-4 sm:space-y-6 mt-3">
            {items.map((e,i)=>(
              <div key={i} className="left-accent bg-[#1a1f26] border border-white/5 p-3 sm:p-5 rounded-lg">
                <div
                  className="font-semibold text-sm sm:text-base"
                  style={{ color: "#fff" }}
                >
                  {e.title}
                </div>
                <div className="date-blue mt-1 text-xs sm:text-sm text-cyan-100">{e.date}</div>
                <p className="text-xs sm:text-sm opacity-80 mt-2 text-gray-200">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
