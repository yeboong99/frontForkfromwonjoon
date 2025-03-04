export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  try {
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
          "⚠️ Access Token이 계속 갱신되고 있습니다. 무한 루프 방지를 위해 추가 요청을 중단합니다."
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
