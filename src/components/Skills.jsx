import Reveal from './Reveal';
import FocusSection from './FocusSection';

const icons = [
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'HTML5 & CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'SQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Vue', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Java Spring', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Flask', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', style: { filter: 'invert(1) brightness(1.2)' } },
  { name: 'PlatformIO', src: 'https://cdn.simpleicons.org/platformio/f5822a' },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-page">
        <FocusSection>
          <Reveal>
            <div className="card p-4 sm:p-6">
              <h2 className="section-title text-white">스킬 : Skills</h2>
              <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-4">
              {icons.map((s, i) => (
                <Reveal key={s.name} delay={i * 80}>
                  <div
                    className="skill w-full h-[90px] xs:h-[110px] sm:h-[140px] flex flex-col items-center justify-center"
                  >
                    <img
                      src={s.src}
                      alt={s.name}
                      className="w-10 h-10 sm:w-16 sm:h-16"
                      loading="lazy"
                      decoding="async"
                      width={64}
                      height={64}
                      style={s.style}
                    />
                    <div className="label mt-2 text-xs sm:text-base font-semibold text-white">{s.name}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            </div>
          </Reveal>
        </FocusSection>
      </div>
    </section>
  );
}
