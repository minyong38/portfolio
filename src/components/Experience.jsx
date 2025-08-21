export default function Experience() {
  const items = [
    {
      title: "없움 ㅠ..",
     
    },
    
  ];
  return (
    <section id="exp" className="section">
      <div className="container-page">
        <div className="card p-6">
          <h2 className="section-title">연구 경험 : Experience</h2>

          <div className="space-y-6 mt-3">
            {items.map((e,i)=>(
              <div key={i} className="left-accent bg-[#1a1f26] border border-white/5 p-5">
                <div className="text-white font-semibold">{e.title}</div>
                <div className="date-blue mt-1">{e.date}</div>
                <p className="text-sm opacity-80 mt-2">{e.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
