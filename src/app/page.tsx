"use client";

import { useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.toleave.shop/auth/check", { credentials: "include" })
      .then((res) => {
        console.log("🟢 응답 헤더 전체:", [...res.headers.entries()]); // ✅ 모든 헤더 출력
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("✅ 로그인 상태 확인 성공:", data);
          console.log("🔑 Access Token:", getCookie("Authorization"));
          console.log("🔑 Refresh Token:", getCookie("Refresh-Token"));
          console.log("👤 User Identifier:", getCookie("User-Identifier"));

          window.location.href = "https://toleave.shop/"; // ✅ 로그인 성공 시 리다이렉트
        }
      })
      .catch((error) => console.error("🚨 로그인 상태 확인 실패:", error));
  }, []);

  const loginHandler = (provider: string) => {
    setLoading(true);
    const authUrl = `https://api.toleave.shop/oauth2/authorization/${provider}`;

    console.log(`🔵 [로그인 요청] OAuth ${provider} 로그인 페이지로 이동...`);
    console.log("📌 이동할 URL:", authUrl);

    window.location.href = authUrl; // ✅ OAuth 로그인 페이지로 이동
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button
        type="button"
        onClick={() => loginHandler("naver")}
        disabled={loading}
      >
        네이버로 로그인하기
      </button>
      <button
        type="button"
        onClick={() => loginHandler("kakao")}
        disabled={loading}
      >
        카카오로 로그인하기
      </button>
      <button
        type="button"
        onClick={() => loginHandler("google")}
        disabled={loading}
      >
        구글로 로그인하기
      </button>
    </div>
  );
};

export default Login;

// ✅ 쿠키에서 특정 값 가져오는 함수 추가
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};
