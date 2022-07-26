import React, { useState } from "react";
import { InfoCard, TextContainer } from "../../components/Liststyle";
import { Column } from "./ReserveStyle";
import ResModal from "../../components/book/ResModal";
function ReserveCard({ res, idx }: any) {
  return (
    <InfoCard>
      <TextContainer>
        <Column>{idx + 1}</Column>
        <Column>{`${res?.rezDate}/ ${res?.rezHour}시`}</Column>
        <Column>{res?.hpName}</Column>
        <Column>{res?.resName}</Column>
        <Column>
          <ResModal res={res} />
        </Column>
      </TextContainer>
    </InfoCard>
  );
}

export default ReserveCard;
