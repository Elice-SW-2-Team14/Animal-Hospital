import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

export const CalendarTitle = styled.span`
  margin-left: 12px;
  font-size: 21px;
`;

const CalenderUi = () => {
  const [value, setValue] = useState(new Date());

  // 날짜를 클릭하면 바뀌는 함수 ( 날짜를 클릭할때마다 아래의 시간 컴포넌트를 새로 불러와서 상태를 관리한다. )
  const handleChangeDay = () => {
    console.log('바뀌나용?');
  };

  console.log(value);
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faCalendarDays} />
        <CalendarTitle>예약</CalendarTitle>
      </div>
      <Calendar
        onChange={setValue}
        value={value}
        calendarType="Hebrew"
        onClickDay={handleChangeDay}
      />
      {/* 임시로 날짜 데이터를 활용하기 위해서 두었습니다. */}
      {/* {moment(value).format('YYYY년 MM월 DD일')} */}
    </div>
  );
};
export default CalenderUi;
