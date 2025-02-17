'use client';

import axios from 'axios';
import { useCallback } from 'react';

const Login = () => {
  const loginHandler = useCallback(async () => {
    try {
      console.log('🔵 로그인 요청 시작...');

      const response = await axios.get(
        'https://toleave.shop/oauth2/authorization/naver',
        {
          withCredentials: true, // ✅ 쿠키 포함 요청
          maxRedirects: 0, // ✅ 리디렉션 방지 (Axios가 자동으로 따라가지 않도록)
          validateStatus: (status) => status >= 200 && status < 400, // ✅ 3xx 상태 코드도 에러로 간주하지 않도록 설정
        }
      );

      console.log('🟢 서버 응답 상태 코드:', response.status);
      console.log('🟢 응답 헤더:', response.headers);

      // ✅ 리디렉션 URL을 직접 확인하여 이동
      if (response.status === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          console.log('🟠 리디렉션 URL 감지됨:', redirectUrl);
          window.location.href = redirectUrl;
        } else {
          console.warn('⚠️ 302 응답이지만 리디렉션 URL이 없음!');
        }
      } else {
        console.warn('⚠️ 예상치 못한 응답 코드:', response.status);
      }
    } catch (error) {
      console.error('🔴 로그인 오류:', error);

      if (axios.isAxiosError(error)) {
        console.error('🔴 Axios 오류 응답:', error.response);
        console.error('🔴 오류 상태 코드:', error.response?.status);
        console.error('🔴 오류 헤더:', error.response?.headers);
        console.error('🔴 오류 데이터:', error.response?.data);
      }
    }
  }, []);

  return (
    <button type="button" onClick={loginHandler}>
      네이버로 시작하기
    </button>
  );
};

export default Login;
