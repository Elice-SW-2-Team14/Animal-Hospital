import React from "react";
import {
  InfoCard,
  TextContainer,
  Title,
  InfoText,
  StatusContainer,
  Select,
} from "./style";
function UserCard() {
  return (
    <InfoCard>
      <TextContainer>
        <Title>일반회원</Title>
        <InfoText>유저이름</InfoText>
        <InfoText>이메일</InfoText>

        <StatusContainer>
          <Select>
            <option>회원</option>
            <option>탈퇴회원</option>
          </Select>
        </StatusContainer>
      </TextContainer>
    </InfoCard>
  );
}

export default UserCard;
