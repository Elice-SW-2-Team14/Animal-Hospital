import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardTitle,
  CardDescription,
  MypageHeader,
  HeaderTitle,
  HeaderDescription,
} from "../../components/MypageCardBtn";

function UserMypage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <MypageHeader>
        <HeaderDescription>마이페이지에 오신걸 환영합니다.</HeaderDescription>
      </MypageHeader>
      <Container>
        <Card
          onClick={() => {
            navigate("/user-info");
          }}
        >
          <i className="fa-solid fa-id-card fa-xl"></i>
          <CardTitle>개인정보</CardTitle>
          <CardDescription>개인정보를 열람하고 수정합니다.</CardDescription>
        </Card>
        <Card
          onClick={() => {
            navigate("/pet-info");
          }}
        >
          <i className="fa-solid fa-paw fa-xl"></i>
          <CardTitle>펫 정보</CardTitle>
          <CardDescription>펫 정보를 열람하고 수정합니다.</CardDescription>
        </Card>
        <Card
          onClick={() => {
            navigate("/user-reservation");
          }}
        >
          <i className="fa-solid fa-list-check fa-xl"></i>
          <CardTitle>예약 내역</CardTitle>
          <CardDescription>예약 내역을 확인하고 관리합니다.</CardDescription>
        </Card>
      </Container>
    </div>
  );
}

export default UserMypage;
