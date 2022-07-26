import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { CheckBtn } from "../../pages/user-reserv/ReserveStyle";
import { InfoBtn } from "../../components/InfoForm";
import { ModalStyle } from "../../components/ModalStyle";
import ReservationContent from "../../components/book/ReservationContent";

const ReservationTitle = styled.h2`
  text-align: center;
`;
const ReservationWrapper = styled.div`
  margin: 20px;
`;
const ReservationSubTitle = styled.h3``;

const ModalCloseBtn = styled(InfoBtn)`
  margin-left: 10px;
`;
const ModalModifyBtn = styled(InfoBtn)``;
const ModalBtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const AdimReserveModal = ({ reserveData, idx }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isToken = localStorage.getItem("token");

  const handleChangeModalState = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Modal isOpen={isOpen} style={ModalStyle} ariaHideApp={false}>
        <ReservationWrapper>
          <ReservationTitle>예약 정보 조회</ReservationTitle>
          <ReservationSubTitle>펫 정보</ReservationSubTitle>
          {/* TODO: 이거 뭔가 너무 징그러운데 어케 좋은 방법 있을까요?? API가 있으면 중복적으로 처리하지 않아도 되려나요??*/}
          {/* 아니면 펫정보부분 따로 컴포넌트화 시키고 서비스 부분 따로 컴포넌트화 시키고 상태부분 따로 컴포넌트화 시킬까요?? */}
          <ReservationContent
            label="종"
            defaultValue={reserveData?.petInfoes[idx].species}
            name="species"
          />
          <ReservationContent
            label="품종"
            defaultValue={reserveData?.petInfoes[idx].breed}
            name="breed"
          />
          <ReservationContent
            label="이름"
            defaultValue={reserveData?.petInfoes[idx].name}
            name="name"
          />
          <ReservationContent
            label="나이"
            defaultValue={reserveData?.petInfoes[idx].age}
            name="age"
          />
          <ReservationContent
            label="성별"
            defaultValue={reserveData?.petInfoes[idx].sex}
            name="sex"
          />
          <ReservationContent
            label="무게"
            defaultValue={reserveData?.petInfoes[idx].weight}
            name="weight"
          />
          <ReservationContent
            label="진료 내역"
            defaultValue={reserveData?.petInfoes[idx].medicalHistory}
            name="medicalHistory"
          />
          <ReservationContent
            label="접종 내역"
            defaultValue={reserveData?.petInfoes[idx].vaccination}
            name="vaccination"
          />
          <ReservationSubTitle>서비스</ReservationSubTitle>
          <ReservationContent
            label="예약 날짜"
            defaultValue={reserveData?.Reservations[idx].rezDate}
            name="reservationDate"
          />
          <ReservationContent
            label="진료 항목"
            defaultValue={reserveData?.petInfoes[idx].neutralized}
            name="clinic"
          />
          <ReservationContent
            label="가격"
            defaultValue={reserveData?.Reservations[idx].price}
            name="price"
          />
          <ReservationSubTitle>상태</ReservationSubTitle>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            sx={{ width: 150 }}
            label="Age"
          >
            <MenuItem value={10}>예약 완료</MenuItem>
            <MenuItem value={20}>예약 취소</MenuItem>
            <MenuItem value={30}>예약 대기</MenuItem>
            <MenuItem value={40}>예약 확정</MenuItem>
          </Select>
          <ModalBtnContainer>
            {isToken && (
              <Link to="/user-info">
                <ModalModifyBtn>수정</ModalModifyBtn>
              </Link>
            )}
            <ModalCloseBtn onClick={handleChangeModalState}>닫기</ModalCloseBtn>
          </ModalBtnContainer>
        </ReservationWrapper>
      </Modal>
      <CheckBtn onClick={handleChangeModalState}>조회﹒수정</CheckBtn>
    </div>
  );
};

export default AdimReserveModal;
