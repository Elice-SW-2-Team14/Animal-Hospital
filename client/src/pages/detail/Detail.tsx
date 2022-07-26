// TODO: 디테일 예약 파트는 전면 리팩토링이 필요할 것 같음!!
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { CustomAxiosGet, CustomAxiosPost } from "../../common/CustomAxios";
import TimeButton from "../../components/detail/TimeButton";
import MainKeyWord from "../../components/main/MainKeyWord";
import CalendarUi from "./Calendar";
import {
  ContentContainer,
  Header,
  ImgContainer,
  InfoContainer,
  InfoDiv,
  InfoTitle,
  MainContainer,
  MainImg,
  MainInfo,
  Reservation,
  ReservationContainer,
  ReviewContainer,
  RightBottomImg,
  RightTopImg,
  Ser,
  ServiceCol,
  ServiceDiv,
  Add,
} from "./DetailStyle";
import HospitalService from "./HospitalService";
import PetSelect from "./PetSelect";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { reservationState } from "../../state/ReservationState";

const BookingButtonContainer = styled.div``;
const BookingButton = styled.button`
  margin: 20px;
  width: 328px;
  height: 52px;
  background-color: #00d780;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

function Detail() {
  const { hospitalName } = useParams();
  const navigate = useNavigate();
  const [hospitalInfo, setHospitalInfo] = useState<any>({});
  const bookDataPost = useRecoilValue(reservationState);
  const token = localStorage.getItem("token");
  const [service, setService] = useState<any>([]);

  const fetchGetData = async () => {
    await CustomAxiosGet.get(`/hospital/${hospitalName}/detail`).then((res) =>
      setHospitalInfo(res.data.data.hospDetailInfo)
    );
    await axios
      .get(
        `http://kdt-sw2-seoul-team14.elicecoding.com:5000/hospital/${hospitalName}/Services`
      ) //
      .then((res) => {
        setService(res.data.data.hospServices);
      });
  };
  useEffect(() => {
    fetchGetData();
  }, []);

  const handleLoginBtn = () => {
    // 토큰이 없으면 로그인하라고 먼저 알려주고 있으면 Post 요청
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }
    CustomAxiosPost.post("/reservation/register", bookDataPost).then((res) =>
      console.log(res)
    );
    alert("예약이 완료되었습니다.");
  };

  return (
    <MainContainer>
      <Header>
        <h1>{hospitalInfo.name}</h1>
        <p>주소: {hospitalInfo.address?.postalCode}</p>
      </Header>
      <ImgContainer>
        <MainImg
          width="680px"
          height="433.66px"
          src={hospitalInfo.image && hospitalInfo.image[0]}
          alt="img"
        />
        <div>
          <RightTopImg
            width="320px"
            height="216.83px"
            src={hospitalInfo.image && hospitalInfo.image[1]}
            alt="img"
          />
          <RightBottomImg
            width="320px"
            height="213.33px"
            src={hospitalInfo.image && hospitalInfo.image[2]}
            alt="img"
          />
        </div>
      </ImgContainer>
      <ContentContainer>
        <InfoContainer>
          <InfoDiv>
            <InfoTitle>{hospitalInfo.name}</InfoTitle>
            <Add>
              {hospitalInfo.address?.address1}
              {hospitalInfo.address?.address2} {hospitalInfo.address?.address3}
            </Add>
            <p>카테고리</p>
            {hospitalInfo.tag && (
              <MainKeyWord
                mainKeyWord={hospitalInfo.tag.map(
                  (items: { name: string }) => items.name
                )}
              />
            )}
          </InfoDiv>
          <MainInfo>
            {hospitalInfo.keyword && (
              <MainKeyWord mainKeyWord={hospitalInfo.keyword} />
            )}
            <ServiceDiv>
              {service.map((a: any, i: number) => (
                <ServiceCol key={i}>
                  <Ser>{a?.name}</Ser>
                  <Ser>{a?.price.toLocaleString()} 원</Ser>
                </ServiceCol>
              ))}
            </ServiceDiv>
          </MainInfo>

          <ReviewContainer>
            <h3>Review!</h3>
          </ReviewContainer>
        </InfoContainer>
        <ReservationContainer>
          <Reservation>
            <CalendarUi />
            {hospitalInfo.businessHours && (
              <TimeButton time={hospitalInfo.businessHours} />
            )}
            <HospitalService />
            <PetSelect />
            <BookingButtonContainer>
              <BookingButton onClick={handleLoginBtn}>예약 하기</BookingButton>
            </BookingButtonContainer>
          </Reservation>
        </ReservationContainer>
      </ContentContainer>
    </MainContainer>
  );
}

export default Detail;
