import { cookies } from "next/headers";
import { fetchWithAuth } from "../../util/api";

interface UserData {
  email: string;
  name: string;
  role: string;
  policyAgreed: boolean;
  subscribed: boolean;
}

// ✅ Server Component 적용
export default async function MyPage() {
  const userIdentifier = cookies().get("User-Identifier")?.value;

  if (!userIdentifier) {
    return (
      <div>
        <h1>마이페이지</h1>
        <p style={{ color: "red" }}>
          로그인 정보가 없습니다. 다시 로그인해주세요.
        </p>
      </div>
    );
  }

  // ✅ 서버에서 직접 API 호출
  const requestUrl = `https://api.toleave.shop/user/test/getUserInfo/${userIdentifier}`;
  console.log("📌 요청 보낼 URL:", requestUrl);

  try {
    const res = await fetchWithAuth(requestUrl);

    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "유저 정보를 불러올 수 없습니다.");
    }

    const userData: UserData = data.data;

    return (
      <div>
        <h1>마이페이지</h1>
        <p>
          <strong>이메일:</strong> {userData.email}
        </p>
        <p>
          <strong>이름:</strong> {userData.name}
        </p>
        <p>
          <strong>역할:</strong> {userData.role}
        </p>
        <p>
          <strong>약관 동의:</strong>{" "}
          {userData.policyAgreed ? "동의함" : "동의 안함"}
        </p>
        <p>
          <strong>유료 구독 상태:</strong>{" "}
          {userData.subscribed ? "구독 중" : "미구독"}
        </p>
      </div>
    );
  } catch (error) {
    console.error("🚨 유저 정보 요청 실패:", error);
    return (
      <div>
        <h1>마이페이지</h1>
        <p style={{ color: "red" }}>
          {error instanceof Error ? error.message : "알 수 없는 오류 발생"}
        </p>
      </div>
    );
  }
}
