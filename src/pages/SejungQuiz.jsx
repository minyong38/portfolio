import { useState } from 'react';
import { Link } from 'react-router-dom';

// 퀴즈 데이터
const QUIZ_DATA = [
  {
    id: 1,
    question: '미뇽이가 제일 좋아하는 음식은?',
    options: ['초밥', '삼겹살', '파스타', '피자'],
    answer: 1, // 인덱스 (0부터 시작)
    emoji: '🍕',
  },
  {
    id: 2,
    question: '우리가 처음 만난 장소는?',
    options: ['강남', '홍대', '신사동', '용산'],
    answer: 2,
    emoji: '💕',
  },
  {
    id: 3,
    question: '미뇽이의 MBTI는?',
    options: ['ENFP', 'INFP', 'ENFJ', 'INFJ'],
    answer: 1, // 정답을 여기에 설정하세요
    emoji: '💭',
  },
  {
    id: 4,
    question: '미뇽이가 고백한 장소는?',
    options: ['강남역', '영종도 바다', '카페', '공원'],
    answer: 1,
    emoji: '💗',
  },
  {
    id: 5,
    question: '우리가 가장 많이 간 데이트 장소는?',
    options: ['카페', '강남', '영화관', '공원'],
    answer: 1,
    emoji: '📍',
  },
];

function QuizCard({ quiz, onAnswer, answered, selectedAnswer }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 sm:p-8 mb-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">{quiz.emoji}</div>
        <h3 className="text-rose-500 font-bold text-lg sm:text-xl">
          {quiz.question}
        </h3>
      </div>

      <div className="space-y-3">
        {quiz.options.map((option, idx) => {
          const isCorrect = idx === quiz.answer;
          const isSelected = idx === selectedAnswer;
          const showResult = answered;

          let buttonClass = 'w-full py-3 px-4 rounded-xl font-semibold transition-all ';

          if (!showResult) {
            buttonClass += 'bg-pink-100 hover:bg-pink-200 text-pink-700 hover:scale-105';
          } else if (isCorrect) {
            buttonClass += 'bg-green-400 text-white';
          } else if (isSelected && !isCorrect) {
            buttonClass += 'bg-red-400 text-white';
          } else {
            buttonClass += 'bg-gray-200 text-gray-500';
          }

          return (
            <button
              key={idx}
              onClick={() => !answered && onAnswer(idx)}
              disabled={answered}
              className={buttonClass}
            >
              {option}
              {showResult && isCorrect && ' ✓'}
              {showResult && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-6 text-center">
          {selectedAnswer === quiz.answer ? (
            <p className="text-green-500 font-bold">정답! 🎉</p>
          ) : (
            <p className="text-rose-500 font-bold">아쉽! 다시 도전해봐요 💪</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function SejungQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (quizId, selectedIdx) => {
    setAnswers(prev => ({
      ...prev,
      [quizId]: selectedIdx,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_DATA.forEach(quiz => {
      if (answers[quiz.id] === quiz.answer) {
        correct++;
      }
    });
    return correct;
  };

  const allAnswered = QUIZ_DATA.every(quiz => answers[quiz.id] !== undefined);
  const score = calculateScore();
  const totalQuestions = QUIZ_DATA.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 px-4 py-12 relative">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">💭</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-2">
            커플 퀴즈
          </h1>
          <p className="text-pink-400">서로에 대해 얼마나 알고 있을까요?</p>
        </div>

        {/* 퀴즈 목록 */}
        <div className="mb-8">
          {QUIZ_DATA.map(quiz => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onAnswer={(idx) => handleAnswer(quiz.id, idx)}
              answered={answers[quiz.id] !== undefined}
              selectedAnswer={answers[quiz.id]}
            />
          ))}
        </div>

        {/* 결과 확인 버튼 */}
        {allAnswered && !showResult && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowResult(true)}
              className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              결과 보기 🎉
            </button>
          </div>
        )}

        {/* 최종 결과 */}
        {showResult && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center mb-8 sejung-letter-open">
            <div className="text-6xl mb-4">
              {score === totalQuestions ? '🏆' : score >= totalQuestions / 2 ? '🎉' : '💪'}
            </div>
            <h2 className="text-rose-500 font-bold text-2xl mb-3">
              {score}점 / {totalQuestions}점
            </h2>
            <p className="text-pink-600 text-lg mb-4">
              {score === totalQuestions && '완벽해요! 서로를 너무 잘 알고 있어요 💗'}
              {score >= totalQuestions * 0.8 && score < totalQuestions && '대단해요! 거의 다 맞혔어요 🎉'}
              {score >= totalQuestions * 0.6 && score < totalQuestions * 0.8 && '좋아요! 조금만 더 알아가봐요 😊'}
              {score < totalQuestions * 0.6 && '더 많이 알아가는 시간을 가져봐요 💕'}
            </p>
            <button
              onClick={() => {
                setAnswers({});
                setShowResult(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-pink-400 hover:text-pink-500 underline text-sm"
            >
              다시 풀기
            </button>
          </div>
        )}

        {/* 돌아가기 */}
        <div className="text-center">
          <Link
            to="/sejung"
            className="text-pink-400 hover:text-pink-500 underline text-sm"
          >
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
