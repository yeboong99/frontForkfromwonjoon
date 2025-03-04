// 🆕 쿠키에서 특정 값 가져오는 함수 추가
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// ✅ Access Token 재발급 처리 포함
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // ✅ Access Token이 재발급된 경우 (205 상태 코드)
  if (response.status === 205) {
    console.log("🔄 Access Token이 갱신됨. 요청을 다시 시도합니다.");

    // 재발급된 쿠키에서 최신 Access Token을 기반으로 재요청
    response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  }

  return response;
};
