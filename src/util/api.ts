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

// ✅ Access Token 갱신 처리 포함
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  try {
    let response = await fetch(url, {
      ...options,
      credentials: "include", // ✅ 쿠키 포함하여 요청
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    // ✅ 205 응답 (Access Token 갱신)
    if (response.status === 205) {
      console.log("🔄 Access Token이 갱신됨. 요청을 다시 시도합니다.");

      // ✅ 재발급된 쿠키를 기반으로 단 한 번만 재요청
      response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      if (response.status === 205) {
        console.warn(
          "⚠️ Access Token이 계속 갱신되고 있음. 무한 루프 방지를 위해 추가 요청을 중단합니다."
        );
        return response;
      }
    }

    return response;
  } catch (error) {
    console.error("🚨 fetchWithAuth 요청 중 오류 발생:", error);
    throw error;
  }
};
