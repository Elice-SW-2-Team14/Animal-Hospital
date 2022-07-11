import React from 'react';
import "antd/dist/antd.min.css";
import styled from "styled-components";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  alert(
    '사진 수정 버튼이 클릭되었습니다(확인용)'
  )
};

const editButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  alert('병원 정보들 수정 버튼이 클릭되었습니다(확인용)')
}

// 임의 타입 지정. 백엔드에서 병원 스키마 완성되면 명칭 수정할 예정.
type HospitalCard = {
  hospitalName: string,
  doctorName: string,
  email: string,
  password: string,
  phoneNumber: number,
  tradersNumber: string,
  licenseNumber: string,
  image: string,
  postalNumber: number,
  address1: string,
  address2: string,
  categories: string,
  keywords: Array<string>,
  openingHours: string,
  customersPerHours: number
}

// 임의 데이터 지정. 마찬가지로 수정 예정.
HospitalCard.defaultProps = {
  hospitalName: '이이진진수수 동동물물병병원원',
  doctorName: '김진수',
  email: 'sarangS2hospital@gmail.com',
  password: '',
  phoneNumber: '010-0000-0000',
  tradersNumber: 'XXXXXXXXX',
  licenseNumber: 'XXXXXXXXX',
  image: 'https://o-oa.com/wp-content/uploads/2020/05/LJS_01.jpg',
  postalNumber: 13477,
  address1: '경기 성남시 분당구 판교공원로5길 15',
  address2: '이진수 동물병원',
  categories: '병원',
  keywords: [],
  openingHours: '24시간',
  customersPerHours: 3
}

export default function HospitalCard({hospitalName, doctorName, email, password, phoneNumber, tradersNumber, licenseNumber, image, postalNumber, address1, address2, categories, keywords, openingHours, customersPerHours}: HospitalCard) {
  return (
    <div>
      <Form style={{ marginLeft: "2rem" }}>
        <Title>병원 정보</Title>
        <div style={{ marginBottom: "1rem" }} />
        <div>
          <SubTitle>병원명</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={hospitalName} disabled />
        </div>
        <div>
          <SubTitle>이름</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={doctorName} disabled />
        </div>
        <div>
          <SubTitle>이메일</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={email} disabled />
        </div>
        <div>
          <SubTitle>비밀번호</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={password} disabled />
        </div>
        <div>
          <SubTitle>병원 연락처</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={phoneNumber} disabled />
        </div>
        <div>
          <SubTitle>사업자 등록번호</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={tradersNumber} disabled />
        </div>
        <div>
          <SubTitle>면허번호</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={licenseNumber} disabled />
        </div>
        <div>
          <SubTitle>병원 사진</SubTitle>
          <div style={{ marginBottom: "0.5rem" }} />
          <div>
            <img src={image} width="280px" alt="" />
            <Button style={{ marginLeft: "0.5rem" }} onClick={buttonHandler}>수정</Button>
          </div>
        </div>
        <div style={{ marginBottom: "0.5rem" }} />
        <div>
          <SubTitle>주소</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={postalNumber} disabled />
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={address1} disabled />
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={address2} disabled />
        </div>
        <div>
          <SubTitle>카테고리</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={categories} disabled />
        </div>
        <div>
          <SubTitle>키워드</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={keywords} disabled />
        </div>
        <div>
          <SubTitle>영업시간</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={openingHours} disabled />
        </div>
        <div>
          <SubTitle>시간당 예약가능 고객 수</SubTitle>
          <input style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text" value={customersPerHours} disabled />
        </div>
        <Button onClick={editButtonHandler}>수정</Button>
      </Form>
    </div>
  );
}

const SubTitle = styled.span`
  font-size: 16px;
`