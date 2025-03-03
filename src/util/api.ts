export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // ✅ Access Token이 재발급되었을 경우 (205 상태 코드)
  if (response.status === 205) {
    console.log("🔄 Access Token이 갱신됨. 요청을 다시 시도합니다.");

    // 갱신된 쿠키를 기반으로 재요청
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
