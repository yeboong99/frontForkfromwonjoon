'use client';

import { useCallback } from 'react';

const Login = () => {
  const loginHandler = useCallback(() => {
    const authUrl = 'https://toleave.shop/oauth2/authorization/naver';

    console.log('🔵 [로그인 요청] OAuth 네이버 로그인 페이지로 이동합니다...');
    console.log('📌 이동할 URL:', authUrl);

    // 네이버 로그인 페이지로 이동 (백엔드가 자동으로 OAuth2 리디렉션 처리)
    window.location.href = authUrl;
  }, []);

  return (
    <button type="button" onClick={loginHandler}>
      네이버로 시작하기
    </button>
  );
};

export default Login;
