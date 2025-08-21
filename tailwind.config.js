/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        ui: [
          "system-ui","Segoe UI","Noto Sans KR","Apple SD Gothic Neo","AppleGothic","Arial"
        ],
      },
      colors: {
        base:  "#0a0f14",   // 전체 배경
        panel: "#11151b",   // 섹션 카드
        ink:   "#b7c2ce",   // 본문 텍스트
        brand: "#6c63ff",   // 포인트 블루
        dim:   "#9aa7b5",   // 옅은 텍스트
      },
      maxWidth: { page: "980px" }, // 스샷 폭
      boxShadow: {
        soft: "0 12px 32px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};
