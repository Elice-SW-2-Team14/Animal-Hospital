import React from "react";
import { PageHeader } from "antd";
import {
  Container,
  Card,
  CardTitle,
  CardDescription,
} from "../../components/MypageCardBtn";

function AdminMypage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <PageHeader
        onBack={() => null}
        title="name님"
        subTitle="마이페이지에 오신걸 환영합니다"
      />
      <Container>
        <Card>
          <i className="fa-solid fa-users fa-xl"></i>
          <CardTitle>전체 유저정보</CardTitle>
          <CardDescription>
            전체 회원 정보를 열람하고 관리합니다.
          </CardDescription>
        </Card>
        <Card>
          <i className="fa-solid fa-hospital fa-xl"></i>
          <CardTitle>전체 병원 정보</CardTitle>
          <CardDescription>
            전체 병원 정보를 열람하고 관리합니다.
          </CardDescription>
        </Card>
        <Card>
          <i className="fa-solid fa-book fa-xl"></i>
          <CardTitle>모든 예약 내역</CardTitle>
          <CardDescription>
            전체 예약 내역을 확인하고 관리합니다.
          </CardDescription>
        </Card>
        <Card>
          <i className="fa-brands fa-adversal fa-xl"></i>
          <CardTitle>프로모션 관리</CardTitle>
          <CardDescription>프로모션을 관리합니다.</CardDescription>
        </Card>
      </Container>
    </div>
  );
}

export default AdminMypage;
