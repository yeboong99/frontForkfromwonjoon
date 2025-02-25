"use client";

import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    fetch("https://toleave.shop/", {
      credentials: "include", // ✅ 쿠키 포함하여 요청
    })
      .then((response) => {
        console.log("🟢 응답 헤더 전체:", [...response.headers.entries()]); // ✅ 모든 헤더 출력
        return response.text().then((text) => {
          console.log("📌 응답 본문:", text); // ✅ 서버 응답 본문 출력 (디버깅용)
          return response;
        });
      })
      .then((response) => {
        const refreshToken = response.headers.get("Refresh-Token");
        const userIdentifier = response.headers.get("User-Identifier");

        if (refreshToken && userIdentifier) {
          console.log("✅ 받은 Refresh-Token:", refreshToken);
          console.log("✅ 받은 User-Identifier:", userIdentifier);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("userIdentifier", userIdentifier);
        } else {
          console.log(
            "🚨 Refresh-Token 또는 User-Identifier가 응답 헤더에 없음."
          );
        }
      })
      .catch((error) => console.error("🚨 로그인 후 요청 실패:", error));
  }, []);

  const loginHandler = () => {
    const authUrl = "https://api.toleave.shop/oauth2/authorization/kakao";

    console.log("🔵 [로그인 요청] OAuth 네이버 로그인 페이지로 이동합니다...");
    console.log("📌 이동할 URL:", authUrl);

    window.location.href = authUrl;
  };

  return (
    <button type="button" onClick={loginHandler}>
      느리야도아조😢
    </button>
  );
};

export default Login;
