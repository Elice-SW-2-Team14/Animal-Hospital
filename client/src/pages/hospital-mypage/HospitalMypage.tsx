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

function HospitalMypage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <MypageHeader>
        <HeaderDescription>마이페이지에 오신걸 환영합니다.</HeaderDescription>
      </MypageHeader>
      <Container>
        <Card
          onClick={() => {
            navigate("/hospital-info");
          }}
        >
          <i className="fa-solid fa-users fa-xl"></i>
          <CardTitle>내 병원 정보</CardTitle>
          <CardDescription>병원 정보를 열람하고 관리합니다.</CardDescription>
        </Card>
        <Card
          onClick={() => {
            navigate("/hospital-reservation");
          }}
        >
          <i className="fa-solid fa-book fa-xl"></i>
          <CardTitle>병원 예약 내역</CardTitle>
          <CardDescription>
            내 병원의 예약 내역을 확인하고 관리합니다.
          </CardDescription>
        </Card>
      </Container>
    </div>
  );
}

export default HospitalMypage;
