"use client";

import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../util/api";

interface UserData {
  email: string;
  name: string;
  role: string;
  policyAgreed: boolean;
  subscribed: boolean;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 요청에서 쿠키를 가져오기
  const userIdentifier = context.req.cookies["User-Identifier"];

  if (!userIdentifier) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { userIdentifier },
  };
}

const MyPage = ({ userIdentifier }: { userIdentifier: string }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // GET 요청 URL 설정
    const requestUrl = `https://api.toleave.shop/user/test/getUserInfo/${userIdentifier}`;
    console.log("📌 요청 보낼 URL:", requestUrl);

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
  }, [userIdentifier]);

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
