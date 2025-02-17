'use client';

import { useEffect, useCallback } from 'react';

const Login = () => {
  // 🔹 [1] 로그인 버튼을 클릭하면 네이버 OAuth 로그인 페이지로 이동
  const loginHandler = useCallback(() => {
    const authUrl = 'https://toleave.shop/oauth2/authorization/naver';

    console.log('🔵 [로그인 요청] OAuth 네이버 로그인 페이지로 이동합니다...');
    console.log('📌 이동할 URL:', authUrl);

    window.location.href = authUrl; // OAuth 로그인 페이지로 이동
  }, []);

  // 🔹 [2] OAuth 로그인 후 리다이렉트된 경우 쿠키를 저장
  useEffect(() => {
    console.log('✅ OAuth 리다이렉트 감지됨');

    fetch('https://toleave.shop/user/me', {
      credentials: 'include', // ✅ 쿠키 포함 요청
    })
      .then((res) => {
        console.log('✅ 응답 헤더 확인:', res.headers);
        const authHeader = res.headers.get('Authorization');
        const refreshTokenHeader = res.headers.get('Refresh-Token');

        if (authHeader) {
          document.cookie = `Authorization=${authHeader}; Path=/; Secure; HttpOnly; SameSite=None`;
          console.log('🍪 Authorization 쿠키 저장 완료!');
        }

        if (refreshTokenHeader) {
          document.cookie = `Refresh-Token=${refreshTokenHeader}; Path=/; Secure; HttpOnly; SameSite=None`;
          console.log('🍪 Refresh-Token 쿠키 저장 완료!');
        }

        console.log('✅ 모든 쿠키 저장 시도 완료');
      })
      .catch((error) => {
        console.error('🚨 쿠키 저장 실패:', error);
      });
  }, []);

  return (
    <div>
      <h1>OAuth 로그인 테스트</h1>
      <button type="button" onClick={loginHandler}>
        네이버로 시작하기
      </button>
    </div>
  );
};

export default Login;
