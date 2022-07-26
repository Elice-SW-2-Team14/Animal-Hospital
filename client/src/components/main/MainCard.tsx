import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MainCardContainer,
  MainCardContent,
  MainCardName,
  MainCardAdress,
  MainCardWrapper,
  MainCardImg,
} from "./MainCardStyle";
import MainKeyWord from "./MainKeyWord";

export interface IData {
  starRating: number;
  name: string;
  address: {
    postalCode: string;
    address1: string;
    address2: string;
  };
  phoneNumber: string;
  businessHours: number[];
  holiday: string[];
  tag: string[];
  keyword: string[];
  image: string[];
  hospitalCapacity: number;
}

interface IProps {
  filtered: IData[];
}

// main페이지에 사용할 컴포넌트
function MainCard({ filtered }: IProps) {
  const dataProps = filtered.map((items, index) => {
    return (
      <MainCardContainer to={`hospital/${items.name}/detail`} key={index}>
        <MainCardImg
          src={items.image[0] || '/mainDefaultImg.jpg'}
          alt=""
          width="300px"
          height="285px"
        ></MainCardImg>
        <MainCardContent>
          <MainCardName>{items.name}</MainCardName>
          <MainCardAdress>
            {items.address.address1} {items.address.address2}
          </MainCardAdress>
          <MainKeyWord mainKeyWord={items.keyword} />
        </MainCardContent>
      </MainCardContainer>
    );
  });

  return <MainCardWrapper>{dataProps}</MainCardWrapper>;
}

export default MainCard;
