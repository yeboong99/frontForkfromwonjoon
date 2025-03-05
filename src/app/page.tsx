"use client";

import { useEffect } from "react";
import { getCookie } from "../util/api";

const Login = () => {
  useEffect(() => {
    // 로그인 이후 쿠키에 담긴 userIdentifier가 있는지 확인
    const userIdentifier = getCookie("User-Identifier");

    if (userIdentifier) {
      console.log("✅ 로그인 성공. User-Identifier:", userIdentifier);
      window.location.href = "https://toleave.shop/"; // 로그인 성공 후 리다이렉트
    } else {
      console.log("🚨 로그인되지 않음.");
    }
  }, []);

  const loginHandler = (provider: string) => {
    const authUrl = `https://api.toleave.shop/oauth2/authorization/${provider}`;

    console.log(`🔵 [로그인 요청] OAuth ${provider} 로그인 페이지로 이동...`);
    console.log("📌 이동할 URL:", authUrl);

    window.location.href = authUrl;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button type="button" onClick={() => loginHandler("naver")}>
        네이버로 로그인하기
      </button>
      <button type="button" onClick={() => loginHandler("kakao")}>
        카카오로 로그인하기
      </button>
      <button type="button" onClick={() => loginHandler("google")}>
        구글로 로그인하기
      </button>
    </div>
  );
};

export default Login;
