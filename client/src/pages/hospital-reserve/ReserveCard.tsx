import React, { useState } from "react";
import styled from "styled-components";
import { CustomAxiosGet } from "../../common/CustomAxios";
import { InfoCard, TextContainer, InfoText } from "../../components/Liststyle";

export const Column = styled(InfoText)`
  flex: 0 0 20%;
`;

export default function ReserveCard() {
  const [reservedUser, setReservedUser] = useState([]);

  async function getData() {
    const res = await CustomAxiosGet.get(
      "/reservation/hospital/list?page=2&perPage=3"
    );
    console.log(res.data.data.reservationInfo);
  }

  getData();

  return (
    <>
      <InfoCard>
        <TextContainer>
          <Column>인덱스</Column>
          <Column>날짜+시간</Column>
          <Column>병원이름</Column>
        </TextContainer>
      </InfoCard>
    </>
  );
}
