"use client";

import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get("loginSuccess");

    if (loginSuccess === "true") {
      console.log("✅ 로그인 성공! 메인 페이지로 이동합니다.");
      window.location.href = "https://toleave.shop";
    }
  }, []);

  const loginHandler = (provider: string) => {
    const authUrl = `https://api.toleave.shop/oauth2/authorization/${provider}`;
    console.log(
      `🔵 [로그인 요청] OAuth ${provider} 로그인 페이지로 이동:`,
      authUrl
    );
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
