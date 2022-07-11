import React from "react";
import styled from "styled-components";
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
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <MypageHeader>
        <HeaderTitle>이름님</HeaderTitle>
        <HeaderDescription>마이페이지에 오신걸 환영합니다.</HeaderDescription>
      </MypageHeader>
      <Container>
        <Card>
          <i className="fa-solid fa-users fa-xl"></i>
          <CardTitle>내 병원 정보</CardTitle>
          <CardDescription>병원 정보를 열람하고 관리합니다.</CardDescription>
        </Card>
        <Card>
          <i className="fa-solid fa-book fa-xl"></i>
          <CardTitle>모든 예약 내역</CardTitle>
          <CardDescription>
            전체 예약 내역을 확인하고 관리합니다.
          </CardDescription>
        </Card>
      </Container>
    </div>
  );
}

export default HospitalMypage;
