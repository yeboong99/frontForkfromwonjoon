'use client';

import axios from 'axios';
import { useCallback } from 'react';

const Login = () => {
  const loginHandler = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://toleave.shop/oauth2/authorization/naver',
        {
          withCredentials: true,
        }
      );

      // ✅ Response Headers 로그 출력
      console.log('Response Headers:', response.headers);
      console.log('Redirecting to:', response.request.responseURL);

      window.location.href = response.request.responseURL;
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  }, []);

  return (
    <button type="button" onClick={loginHandler}>
      네이버로 시작하기
    </button>
  );
};

export default Login;
