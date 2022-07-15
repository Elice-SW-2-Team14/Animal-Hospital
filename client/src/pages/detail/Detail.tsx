import React from 'react';
import styled from 'styled-components';
import TimeButton from '../../components/TimeButton';
import CalendarUi from './Calendar';
const MainContainer = styled.div`
  max-width: 1000px;
  margin: 1rem auto;
`;
const Header = styled.div`
  margin: 24px 0;
`;
const ImgContainer = styled.div`
  display: flex;
  cursor: pointer;
  /* border: 1px solid; */
`;
const MainImg = styled.img`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const RightTopImg = styled.img`
  border-top-right-radius: 10px;
  width: 320px;
  height: 50%;
`;
const RightBottomImg = styled.img`
  border-bottom-right-radius: 10px;
  width: 320px;
`;
const ContentContainer = styled.div`
  display: flex;
`;
const InfoContainer = styled.div`
  flex: 0 0 60%;
`;
const ReservationContainer = styled.div`
  padding: 1rem;
  flex: 0 0 40%;
`;
const InfoDiv = styled.div`
  padding-top: 48px;
  padding-bottom: 24px;
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
`;
const MainInfo = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
`;
const ReviewContainer = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
`;
const Reservation = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
`;

function Detail() {
  return (
    <MainContainer>
      <Header>
        <h1>병원 이름</h1>
        <p>Address: 1678 Nambusunhwan-ro, Sillim-dong, Gwanak-gu, Seoul</p>
      </Header>
      <ImgContainer>
        <MainImg
          src="http://www.designtwoply.com/wp-content/uploads/2019/09/designtwoply0000.jpg"
          alt="img"
        />
        <div>
          <RightTopImg
            src="http://www.designtwoply.com/wp-content/uploads/2019/09/designtwoply-project-126-4.jpg"
            alt="img"
          />
          <RightBottomImg
            src="http://www.designtwoply.com/wp-content/uploads/2019/09/designtwoply-project-126-5.jpg"
            alt="img"
          />
        </div>
      </ImgContainer>
      <ContentContainer>
        <InfoContainer>
          <InfoDiv>
            <h2>병원 이름</h2>
            <p>카테고리들</p>
          </InfoDiv>
          <MainInfo>
            <div>키워드들</div>
            <div>수술, 미용, 진료 등</div>
          </MainInfo>
          <ReviewContainer>
            <h3>Review!</h3>
          </ReviewContainer>
        </InfoContainer>
        <ReservationContainer>
          <Reservation>
            <CalendarUi />
            <TimeButton />
          </Reservation>
        </ReservationContainer>
      </ContentContainer>
    </MainContainer>
  );
}

export default Detail;
