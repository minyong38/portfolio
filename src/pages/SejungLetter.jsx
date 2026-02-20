import { useState } from 'react';
import { Link } from 'react-router-dom';

// 편지 데이터 배열
const LETTERS = [
  {
    id: 1,
    emoji: '💗',
    title: '세정이에게',
    date: '2026.02.10',
    content: [
      '하이이이',
      '가끔 시간날때 편지써놓을게 생각날때 들어와서 읽어 알게쮜',
      '우리 앞으로도 예쁜 추억 많이 만들자아\n맛있는 것도 많이 먹고, 예쁜 곳도 많이 가구',
      '사랑해, 세정아 🌸',
    ],
  },
  {
    id: 2,
    emoji: '🌸',
    title: '세정이에게',
    date: '2026.02.20',
    content: [
      '안뇽 졍아',
      '보고싶어어어어어엉어 ',
      '오늘은 날씨가 너무 좋아서 자기랑 같이 나들이 가고 싶었어 ㅠㅠ 백수하고싶다',
      '우리 3월에 같이 벚꽃 보러 가자 🌸',
      '사랑해, 세정아 💗',
    ],
  },
  // {
  //   id: 3,
  //   emoji: '💐',
  //   title: '예쁜 세정이에게',
  //   date: '2024.04.01',
  //   content: [
  //     '벌써 봄이네',
  //     '같이 벚꽃 보러 가고 싶다',
  //     '너랑 함께라면 매일이 봄날 같아 🌸',
  //     '언제나 사랑해 💗',
  //   ],
  // },
];

export default function SejungLetter() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col items-center justify-center px-4 py-12 relative select-none">
      <div className="z-10 w-full max-w-4xl">
        {selectedLetter === null ? (
          /* 편지 목록 */
          <div>
            <div className="text-center mb-8">
              <h1 className="text-rose-500 font-bold text-3xl mb-2">💌 러브레터함</h1>
              <p className="text-pink-400 text-sm">편지를 눌러서 읽어보세요</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
              {LETTERS.map((letter) => (
                <div
                  key={letter.id}
                  className="cursor-pointer sejung-float"
                  style={{ animationDelay: `${letter.id * 0.2}s` }}
                  onClick={() => setSelectedLetter(letter)}
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all p-8 text-center border border-rose-100 hover:scale-105">
                    <div className="text-6xl mb-4">💌</div>
                    <p className="text-rose-500 font-bold text-lg mb-1">{letter.title}</p>
                    <p className="text-pink-400 text-xs">{letter.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 선택한 편지 */
          <div className="sejung-letter-open max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-10 border border-rose-100">
              <div className="text-3xl mb-4">{selectedLetter.emoji}</div>
              <h2 className="text-rose-500 font-bold text-2xl mb-2">{selectedLetter.title}</h2>
              <p className="text-pink-400 text-xs mb-6">{selectedLetter.date}</p>
              <div className="text-left text-pink-700/90 leading-loose space-y-4 text-sm sm:text-base">
                {selectedLetter.content.map((paragraph, idx) => (
                  <p key={idx} style={{ whiteSpace: 'pre-line' }}>
                    {paragraph}
                  </p>
                ))}
                <p className="text-right text-rose-400 font-semibold mt-6">
                  — 미뇽 올림 💗
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedLetter(null)}
              className="mt-6 text-pink-400 hover:text-pink-500 text-sm underline mx-auto block"
            >
              ← 편지함으로 돌아가기
            </button>
          </div>
        )}
      </div>

      <Link to="/sejung" className="absolute bottom-6 text-pink-400 hover:text-pink-500 underline text-sm z-10">
        ← 돌아가기
      </Link>
    </div>
  );
}
