import { useState, useEffect } from "react";

export default function Guestbook() {
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("guestbook_entries") || "[]");
  });
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("guestbook_entries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setEntries([
      { name: name.trim(), msg: msg.trim(), date: new Date().toLocaleString() },
      ...entries,
    ]);
    setName("");
    setMsg("");
  };

  return (
    <section className="py-14">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-7">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 shadow">
              <svg width="22" height="22" fill="none">
                <rect width="22" height="22" rx="5" fill="#fff" />
                <path d="M6 9h10v2H6V9zm0 4h7v2H6v-2z" fill="#38bdf8" />
              </svg>
            </span>
            방명록
          </h1>
          <form onSubmit={handleSubmit} className="mb-8 space-y-3">
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200 transition"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200 transition"
              placeholder="메시지"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={3}
              maxLength={200}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-cyan-500 hover:to-blue-500 transition"
            >
              남기기
            </button>
          </form>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              방명록 목록
            </h2>
            <ul className="space-y-4">
              {entries.length === 0 && (
                <li className="text-gray-400 text-center">아직 방명록이 없습니다.</li>
              )}
              {entries.map((e, i) => (
                <li
                  key={i}
                  className="border border-gray-100 rounded-xl px-5 py-4 bg-white/80 shadow-sm flex flex-col"
                >
                  <div className="font-bold text-cyan-700 flex items-center gap-2">
                    <svg width="16" height="16" fill="none">
                      <circle cx="8" cy="8" r="7" fill="#e0f2fe" />
                      <text x="8" y="12" text-anchor="middle" font-size="9" fill="#06b6d4">👤</text>
                    </svg>
                    {e.name}
                  </div>
                  <div className="text-gray-800 mt-1 whitespace-pre-line">{e.msg}</div>
                  <div className="text-xs text-gray-400 mt-2 self-end">{e.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

