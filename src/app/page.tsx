'use client';

import { useEffect } from 'react';

const Login = () => {
  // 로그인 버튼 클릭 시 OAuth2 인증 URL로 이동
  const loginHandler = () => {
    const authUrl = 'https://toleave.shop/oauth2/authorization/naver';

    console.log('🔵 [로그인 요청] 네이버 OAuth 페이지로 이동:', authUrl);
    window.location.href = authUrl; // 네이버 OAuth 인증 페이지로 이동
  };

  // OAuth 인증 후 백엔드에서 받은 쿠키가 저장되었는지 확인
  useEffect(() => {
    console.log('🔍 [OAuth 완료 후] 쿠키 확인 시작...');

    const cookies = document.cookie;
    console.log('🍪 [현재 저장된 쿠키]:', cookies);

    if (cookies.includes('Authorization')) {
      console.log('✅ [성공] Authorization 쿠키가 저장됨:', cookies);
    } else {
      console.warn('❌ [실패] Authorization 쿠키가 저장되지 않음.');
    }
  }, []);

  return (
    <button type="button" onClick={loginHandler}>
      네이버로 시작하기
    </button>
  );
};

export default Login;
