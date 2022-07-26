import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ModalStyle } from "../ModalStyle";
import styled from "styled-components";
import ReservationContent from "./ReservationContent";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InfoBtn } from "../InfoForm";
import { Link } from "react-router-dom";
import { CheckBtn } from "../../pages/user-reserv/ReserveStyle";

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

const token = localStorage.getItem("token");
const ResModal = ({ res }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const isToken = localStorage.getItem("token");
  const handleChangeModalState = () => {
    setIsOpen(!isOpen);
  };

  // 일반유저
  const onhandleUpdate = () => {
    const data = {
      rezStatusId: res.rezStatus,
      customerId: res.customer,
    };
    try {
      token &&
        axios.patch(
          `http://kdt-sw2-seoul-team14.elicecoding.com:5000/reservation/user/:${res.reservationId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    } catch {
      // alert("비밀번호가 틀렸습니다.");
    }
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
            label="이름"
            defaultValue={res.petName}
            name="name"
          />
          <ReservationContent
            label="종"
            defaultValue={res.species}
            name="species"
          />
          <ReservationContent
            label="품종"
            defaultValue={res.breed}
            name="breed"
          />
          <ReservationContent label="나이" defaultValue={res.age} name="age" />
          <ReservationContent label="성별" defaultValue={res.sex} name="sex" />
          <ReservationContent
            label="무게"
            defaultValue={res.weight}
            name="weight"
          />
          <ReservationContent
            label="진료 내역"
            defaultValue={res.medicalHistory}
            name="medicalHistory"
          />
          <ReservationContent
            label="접종 내역"
            defaultValue={res.vaccination}
            name="vaccination"
          />
          <ReservationSubTitle>서비스</ReservationSubTitle>
          <ReservationContent
            label="예약 날짜"
            defaultValue={res.rezDate}
            name="reservationDate"
          />
          <ReservationContent
            label="진료 항목"
            defaultValue={res.service}
            name="clinic"
          />
          <ReservationContent
            label="가격"
            defaultValue={res.price}
            name="price"
          />
          <ReservationContent
            label="예약상태"
            defaultValue={res.resName}
            name="res"
          />
          <ModalBtnContainer>
            <ModalModifyBtn onClick={onhandleUpdate}>예약 취소</ModalModifyBtn>
            <ModalCloseBtn onClick={handleChangeModalState}>닫기</ModalCloseBtn>
          </ModalBtnContainer>
        </ReservationWrapper>
      </Modal>
      <CheckBtn onClick={handleChangeModalState}>조회﹒수정</CheckBtn>
    </div>
  );
};

export default ResModal;
