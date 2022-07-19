import React from 'react';
import {
  MainCardContainer,
  MainCardContent,
  MainCardName,
  MainCardAdress,
  MainCardWrapper,
  MainCardImg,
} from './MainCardStyle';
import { sampleData } from './MainData';
import MainKeyWord from './MainKeyWord';

// main페이지에 사용할 컴포넌트
function MainCard() {
  // 추후에는 서버에서 데이터를 받아서 데이터를 뿌리겠습니다.
  const sampleDataProps = sampleData.map((items, index) => {
    return (
      <MainCardContainer key={index}>
        <MainCardImg
          src={items.imageUrl}
          alt=""
          width="300px"
          height="285px"
        ></MainCardImg>
        <MainCardContent>
          <MainCardName>{items.hospitalName}</MainCardName>
          <MainCardAdress>{items.address}</MainCardAdress>
          <MainKeyWord mainKeyWord={items.keyWord} />
        </MainCardContent>
      </MainCardContainer>
    );
  });

  return <MainCardWrapper>{sampleDataProps}</MainCardWrapper>;
}

export default MainCard;
