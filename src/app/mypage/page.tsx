"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../util/api";

interface UserData {
  email: string;
  name: string;
  role: string;
  policyAgreed: boolean;
  subscribed: boolean;
}

const MyPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // localStorage에서 userIdentifier 가져오기
    const userIdentifier = localStorage.getItem("userIdentifier");

    if (!userIdentifier) {
      setError("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    // GET 요청 URL 설정
    const requestUrl = `https://api.toleave.shop/test/getUserInfo/${userIdentifier}`;
    console.log("📌 요청 보낼 URL:", requestUrl); // 디버깅용

    fetchWithAuth(requestUrl)
      .then(async (res: Response) => {
        console.log("🟢 서버 응답 상태 코드:", res.status);
        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUserData(data.data);
        } else {
          throw new Error(data.message || "유저 정보를 불러올 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("🚨 유저 정보 요청 실패:", error);
        setError(
          error instanceof Error ? error.message : "알 수 없는 오류 발생"
        );
      });
  }, []);

  return (
    <div>
      <h1>마이페이지</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : userData ? (
        <div>
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
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default MyPage;
