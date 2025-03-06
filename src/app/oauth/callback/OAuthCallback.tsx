"use client";

import { useEffect } from "react";

const OAuthCallback = () => {
  useEffect(() => {
    const handleOAuthResponse = async () => {
      try {
        const response = await fetch(window.location.href, {
          method: "GET",
          credentials: "include", // ✅ 쿠키 포함
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("📌 OAuth 응답 데이터:", data);

        if (data.success && data.message === "login success") {
          console.log("✅ 로그인 성공! 메인 페이지로 이동합니다.");
          window.location.href = "https://toleave.shop"; // ✅ 메인 페이지로 이동
        } else {
          console.error("🚨 로그인 실패:", data.message);
        }
      } catch (error) {
        console.error("🚨 OAuth 처리 중 오류 발생:", error);
      }
    };

    handleOAuthResponse();
  }, []);

  return <h1>로그인 처리 중...</h1>;
};

export default OAuthCallback;
