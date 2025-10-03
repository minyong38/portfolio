import React from "react";
import { Link } from "react-router-dom";
import "./Music.css";

// 노래 목록 (샘플)
const SONGS = [
  { name: "Supernova", artist: "aespa", youtube: "https://www.youtube.com/watch?v=phuiiNCxRMg" },
  { name: "SPOT! (feat. JENNIE)", artist: "ZICO", youtube: "https://www.youtube.com/watch?v=xfqBQ2XhBCg" },
  { name: "How Sweet", artist: "NewJeans", youtube: "https://www.youtube.com/watch?v=Q3K0TOvTOno" },
  { name: "HEYA (해야)", artist: "IVE", youtube: "https://www.youtube.com/watch?v=07EzMbVH3QE" },
  { name: "고양이 중독", artist: "QWER", youtube: "https://www.youtube.com/watch?v=ImuWa3SJulY" },
  { name: "Magnetic", artist: "ILLIT", youtube: "https://www.youtube.com/watch?v=Vk5-c_v4gMU" },
  { name: "예뻤어", artist: "DAY6", youtube: "https://www.youtube.com/watch?v=BS7tz2rAOSA" },
  { name: "Love Lee", artist: "AKMU", youtube: "https://www.youtube.com/results?search_query=love+lee+%EB%AE%A4%EB%B9%84" },
];

export default function Music() {
  return (
    <div className="music-container">
      <h1>My Favorite Songs</h1>
      <p className="subtitle">최근 즐겨 듣는 노래 리스트</p>

      <ul className="song-list">
        {SONGS.map((song, idx) => (
          <li key={idx} className="song-card">
            <div className="song-number">{String(idx + 1).padStart(2, "0")}</div>
            <div className="song-info">
              <p className="song-title">{song.name}</p>
              <p className="song-artist">{song.artist}</p>
            </div>
            <a
              href={song.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-play-btn"
              aria-label={`${song.name} 유튜브에서 듣기`}
            >
              ▶
            </a>
          </li>
        ))}
      </ul>

      <Link to="/home" className="home-link-btn">
        메인으로 돌아가기
      </Link>
    </div>
  );
}

