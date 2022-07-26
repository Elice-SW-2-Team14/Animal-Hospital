import React, { useState } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment";
import { useRecoilState } from "recoil";
import { reservationState } from "../../state/ReservationState";

export const CalendarTitle = styled.span`
  margin-left: 12px;
  font-size: 21px;
`;

const CalenderUi = () => {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useRecoilState(reservationState);

  // 날짜를 클릭하면 바뀌는 함수 ( 날짜를 클릭할때마다 아래의 시간 컴포넌트를 새로 불러와서 상태를 관리한다. )
  const onDateChange = (e: any) => {
    setDate({
      ...date,
      rezDate: `${value.getFullYear()}년 ${
        value.getMonth() + 1
      }월 ${value.getDate()}일`,
    });
  };
  // console.log("date:", date);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faCalendarDays} />
        <CalendarTitle>예약</CalendarTitle>
      </div>
      <Calendar
        onChange={setValue}
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value}
        onClickDay={onDateChange}
      />
    </div>
  );
};
export default CalenderUi;
