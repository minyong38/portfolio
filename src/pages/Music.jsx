import React from "react";
import { Link } from "react-router-dom";

const SONGS = [
  {
    name: "WHAT THE HELL ARE WE DYING FOR ?",
    artist: "Shawn Mendes",
    youtube: "https://www.youtube.com/watch?v=Q1b6tF5Lr9w",
  },
  {
    name: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    youtube: "https://www.youtube.com/watch?v=Q1b6tF5Lr9w",
  },
  {
    name: "16",
    artist: "Sedie Jean",
    youtube: "https://www.youtube.com/watch?v=Q1b6tF5Lr9w",
  },
  // ...원하는 곡 추가
];

export default function Music() {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "60px auto",
        background: "#181818",
        borderRadius: 48,
        padding: "48px 32px 32px 32px",
        boxShadow: "0 8px 32px #0004",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 12 }}>My Favorite Songs</h1>
      <div style={{ fontSize: 16, marginBottom: 24 }}>
        내가 좋아하는 노래 리스트
      </div>
      <table style={{ width: "100%", borderSpacing: 0, marginBottom: 32 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <th style={{ padding: "12px 0", fontWeight: 700, fontSize: 18 }}>No</th>
            <th style={{ padding: "12px 0", fontWeight: 700, fontSize: 18 }}>Music Name</th>
            <th style={{ padding: "12px 0", fontWeight: 700, fontSize: 18 }}>Artist</th>
            <th style={{ padding: "12px 0", fontWeight: 700, fontSize: 18 }}></th>
          </tr>
        </thead>
        <tbody>
          {SONGS.map((song, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #222" }}>
              <td style={{ padding: "14px 0", fontWeight: 600, fontSize: 18 }}>{idx + 1}</td>
              <td style={{ padding: "14px 0", fontSize: 17, textAlign: 'left', paddingLeft: '10px' }}>{song.name}</td>
              <td style={{ padding: "14px 0", fontSize: 17 }}>{song.artist}</td>
              <td style={{ padding: "14px 0" }}>
                <a href={song.youtube} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", width: 36, height: 36, borderRadius: "50%", background: "#fff", color: "#181818", fontWeight: 700, fontSize: 20, lineHeight: "36px", textAlign: "center", boxShadow: "0 2px 8px #0002", transition: "background 0.2s", textDecoration: 'none' }} aria-label="유튜브에서 듣기" >
                  ▶
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        to="/home"
        style={{
          display: "inline-block",
          marginTop: 16,
          padding: "10px 28px",
          borderRadius: 24,
          border: "1.5px solid #fff",
          color: "#fff",
          background: "none",
          fontWeight: 500,
          fontSize: 17,
          textDecoration: "none",
        }}
      >
        홈으로 돌아가기 ↗
      </Link>
    </div>
  );
}