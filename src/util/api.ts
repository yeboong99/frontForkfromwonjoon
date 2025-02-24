export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const userIdentifier = localStorage.getItem("userIdentifier"); // 유저 식별자 추가

  // headers 타입을 명확하게 정의
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries()) // Headers 객체 → 일반 객체 변환
      : (options.headers as Record<string, string>) || {}),
  };

  if (refreshToken) {
    headers["Refresh-Token"] = refreshToken;
  }

  if (userIdentifier) {
    headers["User-Identifier"] = userIdentifier; // 추가
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // Access Token이 담긴 쿠키 포함
  });

  return response;
};
