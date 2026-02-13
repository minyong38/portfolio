import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SejungLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col items-center justify-center px-4 relative select-none">
      <div className="z-10 text-center">
        {!opened ? (
          /* 봉투 */
          <div className="cursor-pointer" onClick={() => setOpened(true)}>
            <div className="sejung-float inline-block">
              <div className="text-8xl sm:text-9xl mb-6">💌</div>
            </div>
            <p className="text-rose-500 font-bold text-xl mb-2">편지가 도착했어요!</p>
            <p className="text-pink-400 text-sm animate-pulse">터치해서 열어보기</p>
          </div>
        ) : (
          /* 편지 */
          <div className="sejung-letter-open">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-10 max-w-md mx-auto border border-rose-100">
              <div className="text-3xl mb-4">💗</div>
              <h2 className="text-rose-500 font-bold text-2xl mb-6">세정에게</h2>
              <div className="text-left text-pink-700/90 leading-loose space-y-4 text-sm sm:text-base">
                <p>
                  하이이이 
                </p>
                <p>
                  가끔 시간날때 편지써놓을게 생각날때 들어와서  읽어 알게쮜
                  
                </p>
                <p>
                  우리 앞으로도 예쁜 추억 많이 만들자아
                  맛있는 것도 많이 먹고, 예쁜 곳도 많이 가구
                </p>
                <p>
                  사랑해, 세정아 🌸
                </p>
                <p className="text-right text-rose-400 font-semibold mt-6">
                  — 미뇽 올림 💗
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpened(false)}
              className="mt-6 text-pink-400 hover:text-pink-500 text-sm underline"
            >
              다시 접기
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
