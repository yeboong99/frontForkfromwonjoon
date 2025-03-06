"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OAuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    // 현재 URL에서 code 및 state 파라미터를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (!code || !state) {
      console.error("🚨 OAuth 코드 또는 상태 정보 없음.");
      return;
    }

    console.log("🔵 OAuth 인증 코드:", code);
    console.log("🔵 OAuth 상태 값:", state);

    // 백엔드로 인증 코드를 보내고 로그인 응답을 확인
    fetch(
      `https://api.toleave.shop/login/oauth2/code/naver?code=${code}&state=${state}`,
      {
        credentials: "include", // ✅ 쿠키 포함하여 요청
      }
    )
      .then(async (response) => {
        console.log("🟢 로그인 응답 상태 코드:", response.status);

        if (!response.ok) {
          throw new Error(`로그인 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        console.log("📌 로그인 응답 데이터:", data);

        // ✅ 응답 메시지가 "login success"이면 메인 페이지로 이동
        if (data.success && data.message === "login success") {
          console.log("✅ 로그인 성공! 메인 페이지로 이동합니다.");
          router.push("/"); // 🔥 메인 페이지로 리다이렉트
        } else {
          throw new Error(data.message || "로그인 처리 실패");
        }
      })
      .catch((error) => {
        console.error("🚨 OAuth 로그인 처리 중 오류 발생:", error);
      });
  }, []);

  return (
    <div>
      <h1>OAuth 로그인 중...</h1>
    </div>
  );
};

export default OAuthCallback;
