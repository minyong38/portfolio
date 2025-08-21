const icons = [
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "HTML5 & CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "SQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-page">
        <div className="card p-6">
          <h2 className="section-title">스킬 : Skills</h2>

          {/* 4열 레이아웃: 7개면 4 + 3 으로 배치 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {icons.map(s => (
              <div
                key={s.name}
                className="skill w-full h-[140px] flex flex-col items-center justify-center"
              >
                <img src={s.src} alt={s.name} />
                <div className="label mt-2">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
