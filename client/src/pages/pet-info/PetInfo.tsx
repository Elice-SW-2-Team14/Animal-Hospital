import React from "react";
import "antd/dist/antd.min.css";
import styled from "styled-components";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  alert("버튼이 클릭되었습니다(확인용)");
};

type PetCard = {
  image: string;
  name: string;
  age: number;
  sex: string;
  weight: number;
  species: string;
  breed: string;
  medicalHistory: string;
  vaccination: string;
  neutralized: string;
};

PetCard.defaultProps = {
  image: "https://cdn.imweb.me/upload/S201712205a3a0910b89f5/d95b7faed6d64.jpg",
  name: "두식이",
  age: 3,
  sex: "",
  weight: 10.0,
  species: "",
  breed: "",
  medicalHistory: "없음",
  vaccination: "모름",
  neutralized: "",
};

export default function PetCard({
  image,
  name,
  age,
  weight,
  species,
  breed,
  vaccination,
  medicalHistory,
  neutralized,
}: PetCard) {
  return (
    <div>
      <Form style={{ marginLeft: "2rem" }}>
        <Title>펫 정보</Title>
        <div style={{ marginBottom: "1rem" }} />
        <div>
          <SubTitle>사진</SubTitle>
          <div style={{ marginBottom: "0.5rem" }} />
          <div>
            <img src={image} width="280px" />
            <Button style={{ marginLeft: "0.5rem" }} onClick={buttonHandler}>
              수정
            </Button>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }} />
        <div>
          <SubTitle>이름</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
            type="text"
            value={name}
            disabled
          />
        </div>
        <div>
          <SubTitle>나이</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
            type="text"
            value={age}
            disabled
          />
        </div>
        <div>
          <SubTitle>성별</SubTitle>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="gender"
              value="F"
            />
            F
          </label>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="gender"
              value="M"
            />
            M
          </label>
          <div style={{ marginBottom: "1rem" }} />
        </div>
        <div>
          <SubTitle>무게</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
            type="text"
            value={weight}
            disabled
          />
        </div>
        <div>
          <SubTitle>종</SubTitle>
          <select
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
            name="animal"
            id="animal"
            disabled
          >
            <option value="">선택</option>
            <option value="개">개</option>
            <option value="고양이">고양이</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div>
          <SubTitle>병력</SubTitle>
          <input
            style={{ marginBottom: "0.5rem", marginLeft: "0.5rem" }}
            type="text"
            value={medicalHistory}
            disabled
          />
        </div>
        <div>
          <SubTitle>접종이력</SubTitle>
          <input
            style={{ marginBottom: "0.5rem", marginLeft: "0.5rem" }}
            type="text"
            value={vaccination}
            disabled
          />
        </div>
        <div>
          <SubTitle>중성화 수술 여부</SubTitle>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="tcr"
              value="완료"
            />
            완료
          </label>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="tcr"
              value="미완료"
            />
            미완료
          </label>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="tcr"
              value="모름"
            />
            모름
          </label>
        </div>
        <Button style={{ marginTop: "1rem" }} onClick={buttonHandler}>
          수정
        </Button>
      </Form>
    </div>
  );
}

const SubTitle = styled.span`
  font-size: 16px;
`;
