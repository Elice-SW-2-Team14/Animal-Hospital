import React from "react";
import { Title } from "../../components/InfoForm";
import { Header } from "../../components/Liststyle";
import { Container, Column } from "../user-reserv/ReserveStyle";
import AdminReserveCard from "./AdminReserveCard";

const AdminReserve = () => {
  return (
    <Container>
      <Title>유저 예약 확인하기</Title>
      <Header>
        <Column>이메일</Column>
        <Column>고객 이름</Column>
        <Column>병원 이름</Column>
        <Column>예약 날짜 시간</Column>
      </Header>
      <AdminReserveCard />
    </Container>
  );
};

export default AdminReserve;
