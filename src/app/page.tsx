"use client";

import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    console.log("🔵 로그인 페이지 로드됨.");
    console.log("📌 현재 쿠키 확인:", document.cookie);
  }, []);

  const loginHandler = () => {
    const authUrl = "https://toleave.shop/oauth2/authorization/naver";

    console.log("🔵 [로그인 요청] OAuth 네이버 로그인 페이지로 이동합니다...");
    console.log("📌 이동할 URL:", authUrl);

    // OAuth 로그인 페이지로 이동
    window.location.href = authUrl;
  };

  return (
    <button type="button" onClick={loginHandler}>
      네이버로 시작하기
    </button>
  );
};

export default Login;
