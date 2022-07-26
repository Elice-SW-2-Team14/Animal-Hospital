import React, { useState } from "react";
import {
  InfoCard,
  TextContainer,
  Title,
  InfoText,
  StatusContainer,
  Select,
} from "../../components/Liststyle";
function UserCard({ data }: any) {
  // console.log(data);

  // 초기값이니까 이건 버튼 누르더라도 안바뀌는거임 => 버튼이 바뀔 때 마다 여기에도 알려줘야 함
  const [status, setStatus] = useState<string>(data?.userStatus);
  // console.log(status);

  // state 생애주기 찾아보기
  const onhandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    // console.log(status);
  };

  return (
    <InfoCard>
      <TextContainer>
        <Title>{data?.role}</Title>
        <InfoText>{data?.userName}</InfoText>
        <InfoText>{data?.email}</InfoText>
        <StatusContainer>
          {data?.userStatus}
          <Select value={status} onChange={onhandleChange}>
            <option value="nl">check</option>
            <option value="normal">회원</option>
            <option value="expired">탈퇴회원</option>
          </Select>
        </StatusContainer>
      </TextContainer>
    </InfoCard>
  );
}

export default UserCard;
