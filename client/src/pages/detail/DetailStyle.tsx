import styled from "styled-components";

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
const InfoTitle = styled.h2``;
export const Add = styled.div`
  padding: 1rem 0;
  color: ${(props) => props.theme.palette.gray};
  margin-bottom: 1rem;
`;
export const ServiceDiv = styled.div`
  padding: 2rem 0.2rem;
`;
export const ServiceCol = styled.div`
  display: flex;
`;
export const Ser = styled.div`
  width: 10rem;
  padding: 0.2rem;
  font-size: 1.05rem;
  color: #565656;
`;
export {
  InfoTitle,
  Reservation,
  ReviewContainer,
  MainInfo,
  InfoDiv,
  ReservationContainer,
  InfoContainer,
  ContentContainer,
  RightBottomImg,
  RightTopImg,
  MainImg,
  ImgContainer,
  Header,
  MainContainer,
};
