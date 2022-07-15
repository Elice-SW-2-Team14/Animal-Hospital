import React from "react";
import {
  InfoCard,
  TextContainer,
  Title,
  InfoText,
  StatusContainer,
  Select,
} from "./style";
function HpCard() {
  return (
    <InfoCard>
      <TextContainer>
        <Title>병원</Title>
        <InfoText>병원명</InfoText>

        <InfoText>이메일</InfoText>
        <StatusContainer>
          <Select>
            <option>가입승인</option>
            <option>확인중</option>
            <option>취소</option>
            <option>불허</option>
          </Select>
          <Select>
            <option>회원</option>
            <option>탈퇴회원</option>
          </Select>
        </StatusContainer>
      </TextContainer>
    </InfoCard>
  );
}

export default HpCard;
