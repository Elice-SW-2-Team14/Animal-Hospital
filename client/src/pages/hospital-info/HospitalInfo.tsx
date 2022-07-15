import React, { useState, useCallback, useEffect } from 'react';
import "antd/dist/antd.min.css";
import styled from "styled-components";
import { Button, Form, Input, Typography } from "antd";
import { theme } from '../../styles/Colors';

import axios from "axios";

const { Title } = Typography;

// 임시 데이터 (api 추가 후 삭제 예정)
const jsonData = {
  "name": "이이진진수수 동동물물병병원원",
  "email": "sarangS2hospital@gmail.com",
  "director": "이진수",
  "password": "12345",
  "address": {
    "postalCode": "13477",
    "address1": "경기 성남시 분당구 판교공원로5길 15",
    "address2": "이진수 동물병원"
  },
  "phoneNumber": "010-0000-0000",
  "businessHours": "24시간",
  "businessNumber": "XXXXXXXXX",
  "licenseNumber": "XXXXXXXXX",
  "holiday": [""],
  "hospitalCapacity": 3,
  "tag": [],
  "keyword": ["소동물 전문"],
  // "image": "https://o-oa.com/wp-content/uploads/2020/05/LJS_01.jpg",
  "image": "",
  "refreshToken": undefined,
  "hospStatus": "정상",
  "hospRegStatus": "승인완료"
}

export default function HospitalCard() {
  /* axios api */
  // const [datas, setDatas] = useState<[]>([]);
  // // 병원 api 생기면 주석 풀고 나머지 작성 예정
  // const API_URL = `http://localhost:5100/api/user`;

  // useEffect(() => {
  //   if (datas.length) console.log("datas:", datas);
  // }, [datas]);

  // const getAPI = useCallback(
  //   async (e: any) => {
  //     e.preventDefault();
  //     const result = await axios.get(API_URL);
  //     console.log("result.data: ", result.data);
  //   },
  //   [API_URL]
  // );

  // office hour: validation 시 e.target.value를 바로 비교하면 밀리지 않게 바로바로 비교 가능

  /* elements */
  const $HashWrapOuter = document.querySelector('.HashWrapOuter')
  const $HashWrapInner = document.createElement('div')
  $HashWrapInner.className = 'HashWrapInner'
  const $keywordNumWarning = document.querySelector('.keywordNumWarning');

  /* states */
  const [name, setName] = useState(jsonData.name);
  const [director, setDirector] = useState(jsonData.director);
  const [phoneNumber, setPhoneNumber] = useState(jsonData.phoneNumber);
  const [businessHours, setBusinessHours] = useState(jsonData.businessHours);
  const [businessNumber, setBusinessNumber] = useState(jsonData.businessNumber);
  const [licenseNumber, setLicenseNumber] = useState(jsonData.licenseNumber);
  const [holiday, setHoliday] = useState(jsonData.holiday);
  const [hospitalCapacity, setHospitalCapacity] = useState(jsonData.hospitalCapacity);
  const [tag, setTag] = useState(jsonData.tag);
  const [keyword, setKeyword] = useState(jsonData.keyword);
  // type: <string[] | []>([])
  const [newKeyword, setNewKeyword] = useState('');
  const [image, setImage] = useState(jsonData.image);
  // refreshToken 추가 예정?
  const [hospStatus, setHospStatus] = useState(jsonData.hospStatus);
  const [hospRegStatus, setHospRegStatus] = useState(jsonData.hospRegStatus);
  const [address, setAddress] = useState();

  /* values */
  const timeList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  
  const { postalCode, address1, address2 } = jsonData.address;
  const email = jsonData.email;

  /* constants */
  const INITIAL_KEYWORDS = keyword;
  const AVAILABLE_KEYWORD_LENGTH = 10;
  const AVAILABLE_KEYWORD_COUNTS = 3;
  
  /* image converter */
  const convertFileToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve: any) => {
      if (reader) {
        reader.onload = () => {
        setImage(reader.result as string);
        resolve();
        };
      }
    });
  };

  /* onChange handlers */
  const onChangeName = (e: any) => {
    setName(e.target.value);
    // api 추가 예정
    console.log("이름 변경:", e.target.value);
  }
  const onChangeDirector = (e: any) => {
    setDirector(e.target.value);
    console.log("대표자명 변경:", e.target.value);
  }
  const onChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
    console.log("연락처 변경:", e.target.value);
  }
  const onChangeLicenseNumber = (e: any) => {
    setPhoneNumber(e.target.value);
    console.log("면허번호 변경:", e.target.value);
  }
  const onChangeHospitalCapacity = (e: any) => {
    setHospitalCapacity(e.target.value);
    console.log("시간당 예약 가능 고객 수 변경:", e.target.value);
  }
  const onChangeBusinessNumber = (e: any) => {
    setBusinessNumber(e.target.value);
    console.log("사업자 등록번호 변경:", e.target.value);
  }
  // e.state.value

  // const renderKeywords = () => {
  //   const $HashWrapOuter = document.querySelector('.HashWrapOuter')
  //   const $HashWrapInner = document.createElement('div')
  //   $HashWrapInner.className = 'HashWrapInner'
  //   $HashWrapInner.innerHTML = '#' + e.target.value;
  //   $HashWrapOuter?.appendChild($HashWrapInner);
  // }

  const onKeyUp = useCallback(
    (e: any) => {
      
      /* 입력 시마다 입력 값 갱신 */
      setNewKeyword(e.target.value);

      /* 키워드 클릭 시 키워드 삭제 */
      $HashWrapInner.addEventListener('click', () => {
        $HashWrapOuter?.removeChild($HashWrapInner)
        console.log($HashWrapInner.innerHTML)
        console.log("newKeyword:", newKeyword)
        setKeyword(keyword.filter((newKeyword) => newKeyword))
      })

      /* enter's key code: 13 */
      // if (e.keyCode === 13  && e.target.value.trim() !== '') {
      if (e.keyCode === 13 && $keywordNumWarning) {
        if (newKeyword.length > AVAILABLE_KEYWORD_LENGTH) {
          $keywordNumWarning.textContent = `키워드는 ${AVAILABLE_KEYWORD_LENGTH}글자 미만이어야 합니다.`
        }
        else if ($HashWrapOuter && newKeyword && keyword.length <= AVAILABLE_KEYWORD_COUNTS) {
          $HashWrapInner.innerHTML = '#' + newKeyword;
          $HashWrapOuter.appendChild($HashWrapInner);
          let copyKeyword = [...keyword];
          copyKeyword.push(newKeyword);
          setKeyword(copyKeyword);
          console.log("Enter Key Pressed. e.target.value:", e.target.value, "keyword:", keyword, "newKeyword:", newKeyword, "copyKeyword(이쪽 데이터를 전달할 예정):", copyKeyword);
          $keywordNumWarning.textContent = "키워드가 정상적으로 등록되었습니다."
          setNewKeyword('');
          console.log("등록 이후 newKeyword", newKeyword)
        }
        else {
          $keywordNumWarning.textContent = `키워드는 ${AVAILABLE_KEYWORD_COUNTS}개까지 등록 가능합니다.`
          setNewKeyword('');
          console.log("초과 등록 실패 이후 newKeyword", newKeyword)
        }
      }
    },
    [keyword, newKeyword, $HashWrapInner, $HashWrapOuter, $keywordNumWarning]
  )

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert(
      '버튼이 클릭되었습니다(확인용)'
    )
  };
  
  const withdrawButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert('병원 회원 탈퇴 버튼이 클릭되었습니다(확인용)')
  }

  return (
    <div>
      <Title>병원 정보</Title>
      <Form
        style={{
          display: "grid",
          justifyContent: 'center',
          alignItems: 'center',
          borderStyle: "solid",
          borderColor: `${theme.palette.orange}`,
          borderWidth: "10px",
          borderRadius: "5%",
          margin: "0 0 2rem 2rem",
          padding: "1rem 2rem 1rem 2rem",
          maxWidth: "480px"
        }}
      >
        <div
          style={{
            display: "grid"
          }}
        >
          <div style={{ marginBottom: "1rem" }} />
          <div>
            <SubTitle>병원명</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text"
              defaultValue={name}
              onChange={onChangeName}
            />
          </div>
          <div>
            <SubTitle>이름</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={director}
              onChange={onChangeDirector}
            />
          </div>
          <div>
            <SubTitle>이메일</SubTitle>
            <input style={{
              marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              value={email}
              autoComplete="username"
              disabled
            />
          </div>
          <div>
            <SubTitle>비밀번호</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="password"
              autoComplete="current-password"
              defaultValue=""
              disabled
            />
            <Button
                style={{ marginLeft: "0.5rem" }}
                onClick={buttonHandler}
              >변경</Button>
          </div>
          <div>
            <SubTitle>병원 연락처</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={phoneNumber}
              onChange={onChangePhoneNumber}
            />
          </div>
          <div>
            <SubTitle>사업자 등록번호</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={businessNumber}
              onChange={onChangeBusinessNumber}
            />
          </div>
          <div>
            <SubTitle>면허번호</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={licenseNumber}
              onChange={onChangeLicenseNumber}
            />
          </div>
          <div>
            <SubTitle>병원 사진</SubTitle>
            <div style={{ marginBottom: "0.5rem" }} />
            <div style={{ marginBottom: "0.5rem" }}>
              <UploadFileLabel htmlFor="uploadFile">업로드</UploadFileLabel>
              <UploadFileInput type="file"
                id="uploadFile"
                accept='image/jpg,image/png,image/jpeg,image/gif'
                name='profile_img'
                onChange={(e: any) => {
                  convertFileToBase64(e.target.files[0]);
                  console.log(e.target.files);
                }}
              />
            </div>
            <div>
              {image && <img src={image} width="280px" alt="" />}
            </div>
          </div>
          <div style={{ marginBottom: "0.5rem" }} />
          <div>
            <SubTitle>주소</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={postalCode}
            />
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={address1}
            />
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={address2}
            />
            <Button style={{ marginLeft: "0.5rem" }}>수정</Button>
          </div>
          <div>
            <SubTitle>카테고리</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={tag}
            />
          </div>
          <div>
            <SubTitle>키워드</SubTitle>
            <span
              style={{
                marginLeft: "1rem",
                color: `${$keywordNumWarning?.textContent === "키워드가 정상적으로 등록되었습니다." ? theme.palette.blue : theme.palette.peach}`
              }}
              className="keywordNumWarning"
            ></span>
            <KeywordInput>
              <div className="HashWrapOuter"></div>
              {/* {INITIAL_KEYWORDS.map((item, index) => {
                $HashWrapInner.innerHTML = '#' + item;
                $HashWrapOuter?.appendChild($HashWrapInner);
                return (
                  <span key={index}></span>
                )
              })} */}
              <input
                className="HashInput"
                type="text"
                onKeyUp={onKeyUp}
                placeholder="키워드 입력"
              />
            </KeywordInput>
          </div>
          <div>
            <SubTitle
              style={{
                marginBottom: "1rem"
              }}
            >영업시간</SubTitle>
            <div>휴무일 선택</div>
            <div
              style={{ marginBottom: "0.5rem" }}
            >
              <Button id="Mon">월</Button>
              <Button id="Tues">화</Button>
              <Button id="Wed">수</Button>
              <Button id="Thurs">목</Button>
              <Button id="Fri">금</Button>
              <Button id="Sat">토</Button>
              <Button id="Sun">일</Button>
            </div>
            <div>시간 선택</div>
            <div>
              {timeList.map((time) => (
                <Button id={time}>{time}:00</Button>
              ))}
            </div>
            <div>
            <SubTitle>시간당 예약가능 고객 수</SubTitle>
            <input
              style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
              type="text"
              defaultValue={hospitalCapacity}
              onChange={onChangeHospitalCapacity}
            />
            </div>
          </div>
        </div>
        <div>
          <Button
            style={{ marginLeft: "1rem" }}
            onClick={withdrawButtonHandler}
          >탈퇴</Button>
        </div>
      </Form>
  </div>
  );
}

const SubTitle = styled.span`
  font-size: 16px;
`
/* 사진 추가 css */

const UploadFileLabel = styled.label`
  display: inline-block;
  padding: .5em .8em;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid ${theme.palette.lightgray};
  border-radius: .25em;

  :hover {
    transition: 2ms ease-in;
    border-color: ${theme.palette.blue};
    color: ${theme.palette.blue};
  }
`
const UploadFileInput = styled.input`
  position: absolute;
  padding: 0;
  margin: -1px;
  clip:rect(0,0,0,0);
  border: 0;
`

/* keyword css */
  
const KeywordInput = styled.div`
  margin: 24px 24px;
  border-bottom: 2px solid ${theme.palette.gray};
  color: rgb(52, 58, 64);
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: ${theme.palette.gray};
  padding: 2px 2px 8px 2px;

  .HashWrapOuter {
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    margin-top: 5px;
    background: #d1edff;
    border-radius: 56px;
    padding: 8px 12px;
    color: ${theme.palette.blue};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    // font-size: 1.4rem;
    line-height: 20px;
    margin-right: 5px;
    cursor: pointer;
  }

  .HashInput {
    width: auto;
    margin: 10px;
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    min-width: 8rem;
    border: none;
  }
`