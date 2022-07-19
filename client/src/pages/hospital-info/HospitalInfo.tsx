import React, { useState, useCallback, useEffect, MouseEvent } from "react";
import "antd/dist/antd.min.css";
import { Button, Form, Input, Typography, Row, Col } from "antd";
import { theme } from "../../styles/Colors";
import {
  SubTitle,
  UploadFileLabel,
  UploadFileInput,
  KeywordInput,
} from "./Style";
import { HospitalInfoType, HospitalServiceInfoType } from "./Interface";
import axios from "axios";
import { createNextState } from "@reduxjs/toolkit";

const { Title } = Typography;

export default function HospitalInfo() {
  // 폼 내용들은 입력 시마다 내용이 곧바로 저장되므로 추후 debouncing 적용 예정

  /* axios api */
  // const [datas, setDatas] = useState<[]>([]);
  // // 병원 api 연결을 위해 주석 풀고 나머지 작성 예정
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

  /* elements */
  const $HashWrapOuter = document.querySelector(".HashWrapOuter");
  const $HashWrapInner = document.createElement("div");
  $HashWrapInner.className = "HashWrapInner";
  const $keywordNumWarning = document.querySelector(".keywordNumWarning");

  /* states */
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfoType>({
    name: "",
    email: "",
    director: "",
    password: "",
    address: {
      postalCode: "",
      address1: "",
      address2: "",
    },
    phoneNumber: "",
    businessHours: "",
    businessNumber: "",
    licenseNumber: "",
    holiday: [""],
    hospitalCapacity: 0,
    tag: "",
    keyword: [""],
    image: "",
  });
  const [hospitalServiceInfo, setHospitalServiceInfo] =
    useState<HospitalServiceInfoType>({
      serviceName: "",
      servicePrice: 0,
      serviceDesc: "",
      serviceCapacity: 0,
    });
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [image, setImage] = useState("");
  const [keyword, setKeyword] = useState<string[] | undefined>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [day, setDay] = useState<string[] | undefined>([]);
  const [time, setTime] = useState<string[] | undefined>([]);
  const [isButtonClicked, setisButtonClicked] = useState<boolean>(false);

  /* values */
  const categoryList = [
    "24시간",
    "야간진료",
    "강아지 전문",
    "고양이 전문",
    "특수동물",
    "호텔",
    "미용",
    "중성화 전문",
    "MRI",
  ];
  const dayList = ["월", "화", "수", "목", "금", "토", "일"];
  const timeList = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];

  /* constants */
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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const hospitalData = {
      ...hospitalInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    const hospitalServiceData = {
      ...hospitalServiceInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    // setHospitalInfo(hospitalData);
    // setHospitalServiceInfo(hospitalServiceData);
  };

  const onKeyUp = useCallback(
    (e: any) => {
      /* 입력 시마다 입력 값 갱신 */
      setNewKeyword(e.target.value);

      /* 키워드 클릭 시 키워드 삭제 */
      // => 삭제 시 DOM에러 뜸. 아마 디자인용으로 새로 생성한 컴포넌트 때문으로 예상중이나 기능은 정상 작동해서 이후 수정할 예정
      $HashWrapInner.addEventListener("click", () => {
        $HashWrapOuter?.removeChild($HashWrapInner);
        console.log($HashWrapInner.innerHTML);
        console.log("newKeyword:", newKeyword);
        setKeyword(keyword!.filter((newKeyword: any) => newKeyword));
      });

      /* enter's key code: 13 */
      if (e.keyCode === 13 && $keywordNumWarning) {
        if (newKeyword.length > AVAILABLE_KEYWORD_LENGTH) {
          $keywordNumWarning.textContent = `키워드는 ${AVAILABLE_KEYWORD_LENGTH}글자 미만이어야 합니다.`;
        } else if (
          $HashWrapOuter &&
          newKeyword &&
          keyword!.length < AVAILABLE_KEYWORD_COUNTS
        ) {
          $HashWrapInner.innerHTML = "#" + newKeyword;
          $HashWrapOuter.appendChild($HashWrapInner);
          setKeyword((current) => [...current!, newKeyword]);
          $keywordNumWarning.textContent =
            "키워드가 정상적으로 등록되었습니다.";
        } else {
          $keywordNumWarning.textContent = `키워드는 ${AVAILABLE_KEYWORD_COUNTS}개까지 등록 가능합니다.`;
          setNewKeyword("");
          console.log("초과 등록 실패");
        }
        console.log("keyword:", keyword, ", newkeyword:", newKeyword);
      }
    },
    [keyword, newKeyword, $HashWrapInner, $HashWrapOuter, $keywordNumWarning]
  );

  // React.FormEvent<HTMLFormElement>
  const onServiceSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("서비스 추가 버튼 클릭");
    console.log("추가된 서비스:", hospitalServiceInfo);
    setServiceList([...serviceList, hospitalServiceInfo]);
    // PROBLEM : 초기화(보내지는 값만 초기화가 되고 form에는 반영이 안돼서 이전에 입력했던 사항이 그대로 남아있음...키워드와 비슷한 문제로 보임)
    setHospitalServiceInfo({
      serviceName: "",
      servicePrice: 0,
      serviceDesc: "",
      serviceCapacity: 0,
    });
    //
    console.log("serviceList:", serviceList);
  };

  /* onClick handlers */

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert("버튼이 클릭되었습니다(확인용)");
  };

  const onClickDay = (e: MouseEvent<HTMLElement>) => {
    const dayId = e.currentTarget.id;
    console.log(dayId); // 월, 화, 수, ...
    // 리액트스럽게 해보고 싶은데 state 활용해서 클릭된 요일만 배열에 담기고 클릭 상태가 아닌 요일은 배열에서 빠지게...일단 이렇게 구현해봄
    // const selectDay = document.querySelector(`#${dayId}`);
    // useEffect();
    if (day!.find((week) => week === dayId)) {
      // 이미 휴무일 배열에 있는 요일이면 제거하고 클릭 상태를 해제한다.
      const dayIndex = day!.indexOf(dayId); // 인덱스값 찾기
      setDay((current) => current!.filter((_, index) => index !== dayIndex));
      // const [id, ...rest] = current;
      // return rest
      // selectDay
    } else {
      // 휴무일 배열에 없는 요일이면 추가한다.
      setDay([...day!, dayId]);
    }
    console.log("휴무일 배열:", day);
  };

  const onClickCategory = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    console.log(id);
  };

  const onClickTime = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    console.log(id);
  };

  const withdrawButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("병원 회원 탈퇴 버튼이 클릭되었습니다(확인용)");
  };

  // PROBLEM: 서비스 삭제 버튼 눌렀을 때 타입 오류 뜸
  // function deleteServiceHandler(e:React.MouseEvent<Element>, index) {
  //   // setServiceList(serviceList.splice(index, 1));
  //   console.log(index, '서비스가 삭제되었습니다.');
  // }

  useEffect(() => {
    // 임시 데이터 (api 추가 후 삭제 예정)
    setHospitalInfo({
      name: "이이진진수수 동동물물병병원원",
      email: "sarangS2hospital@gmail.com",
      director: "이진수",
      password: "12345",
      address: {
        postalCode: "13477",
        address1: "경기 성남시 분당구 판교공원로5길 15",
        address2: "이진수 동물병원",
      },
      phoneNumber: "010-0000-0000",
      businessHours: "24",
      businessNumber: "546521354",
      licenseNumber: "XXXXXXXXX",
      holiday: [""],
      hospitalCapacity: 3,
      tag: "",
      keyword: ["소동물 전문"],
      // "image": "https://o-oa.com/wp-content/uploads/2020/05/LJS_01.jpg",
      image: "",
    });
    setHospitalServiceInfo({
      serviceName: "중성화수술",
      servicePrice: 200000,
      serviceDesc: "지이이잉석둑",
      serviceCapacity: 1,
    });
  }, []);

  return (
    <div style={{ margin: "0 2rem 2rem 2rem" }}>
      <div className="ant-typography">
        <Title>병원 정보</Title>
      </div>
      <div
        style={{
          borderStyle: "solid",
          borderColor: `${theme.palette.orange}`,
          borderWidth: "10px",
          borderRadius: "5%",
          padding: "1rem 2rem 1rem 2rem",
        }}
      >
        <Row>
          <Col span={12}>
            <Form name="hospitalInfoForm">
              <Row>
                <SubTitle>병원명</SubTitle>
                <input
                  name="name"
                  style={{
                    marginBottom: "1rem",
                    marginLeft: "0.5rem",
                  }}
                  type="text"
                  defaultValue={hospitalInfo?.name || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>이름</SubTitle>
                <input
                  name="director"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.director || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>이메일</SubTitle>
                <input
                  name="email"
                  style={{
                    marginBottom: "1rem",
                    marginLeft: "0.5rem",
                  }}
                  type="text"
                  defaultValue={hospitalInfo?.email}
                  autoComplete="username"
                  disabled
                />
              </Row>
              <Row>
                <SubTitle>비밀번호</SubTitle>
                <input
                  name="password"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="password"
                  autoComplete="current-password"
                  defaultValue=""
                  disabled
                />
                <Button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={buttonHandler}
                >
                  변경
                </Button>
              </Row>
              <Row>
                <SubTitle>병원 연락처</SubTitle>
                <input
                  name="phoneNumber"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.phoneNumber || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>사업자 등록번호</SubTitle>
                <input
                  name="businessNumber"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.businessNumber || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>면허번호</SubTitle>
                <input
                  name="licenseNumber"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.licenseNumber || ""}
                  onChange={onChange}
                />
              </Row>
              <Row>
                <SubTitle>병원 사진</SubTitle>
                <div style={{ marginBottom: "0.5rem" }} />
                <div style={{ marginBottom: "0.5rem" }}>
                  <UploadFileLabel htmlFor="uploadFile">업로드</UploadFileLabel>
                  <UploadFileInput
                    type="file"
                    id="uploadFile"
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    name="profile_img"
                    onChange={(e: any) => {
                      convertFileToBase64(e.target.files[0]);
                      console.log(e.target.files);
                    }}
                  />
                </div>
                <div>{image && <img src={image} width="280px" alt="" />}</div>
              </Row>
              <div style={{ marginBottom: "0.5rem" }} />
              <Row>
                <SubTitle>주소</SubTitle>
                <input
                  name="postalCode"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.address?.postalCode || ""}
                />
                <input
                  name="address1"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.address?.address1}
                />
                <input
                  name="address2"
                  style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                  type="text"
                  defaultValue={hospitalInfo?.address?.address2}
                />
                <Button style={{ marginLeft: "0.5rem" }}>수정</Button>
              </Row>
              <Row>
                <SubTitle>카테고리</SubTitle>
              </Row>
              <Row>
                {categoryList.map((category) => (
                  <Button
                    id={category}
                    key={category}
                    onClick={onClickCategory}
                  >
                    {category}
                  </Button>
                ))}
              </Row>
              <Row>
                <SubTitle>키워드</SubTitle>
                <span
                  style={{
                    marginLeft: "1rem",
                    color: `${
                      $keywordNumWarning?.textContent ===
                      "키워드가 정상적으로 등록되었습니다."
                        ? theme.palette.blue
                        : theme.palette.peach
                    }`,
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
                    name="keyword"
                    className="HashInput"
                    type="text"
                    onKeyUp={onKeyUp}
                    placeholder="키워드 입력"
                  />
                </KeywordInput>
              </Row>
              <Row>
                <Col>
                  <SubTitle
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    {dayList.map((day) => (
                      <Button id={day} key={day} onClick={onClickDay}>
                        {day}
                      </Button>
                    ))}
                  </SubTitle>
                  {/* 이부분 */}
                  {/* {dayList.map((day) => {
                      if (isButtonClicked) { // 클릭된 상태면
                        setisButtonClicked(false); // 클릭해제 상태로 바꿈
                        return (
                          <Button
                            id={day}
                            key={day}
                            onClick={onClickDay}
                            style={{
                              borderColor: `${theme.palette.blue}`,
                              color: `${theme.palette.blue}`
                            }} 
                          >{day}</Button>
                        )
                      }
                      // 클릭되지 않았던 상태면
                      setisButtonClicked(true); // 클릭 상태로 바꿈
                      return (
                        <Button
                          id={day}
                          key={day}
                          onClick={onClickDay}
                          >{day}</Button>
                      )
                    })} */}
                  {/* </Row>  */}
                  <Row>시간 선택</Row>
                  <Row>
                    {timeList.map((time) => (
                      <Button id={time} key={time} onClick={onClickTime}>
                        {time}:00
                      </Button>
                    ))}
                  </Row>
                  <Row style={{ marginTop: "1rem" }}>
                    <SubTitle>시간당 예약가능 고객 수</SubTitle>
                    <input
                      name="hospitalCapacity"
                      style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
                      type="text"
                      defaultValue={hospitalInfo?.hospitalCapacity || 0}
                      onChange={onChange}
                    />
                  </Row>
                  <Row>
                    <Button
                      onClick={() => {
                        console.log(hospitalInfo);
                      }}
                    >
                      개발자 확인 버튼
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Form>
              <Row>
                <SubTitle
                  style={{
                    margin: "auto",
                    fontWeight: "bold",
                  }}
                >
                  서비스 추가
                </SubTitle>
              </Row>
              <Row>
                <div>
                  <label>서비스명</label>
                  <input
                    name="serviceName"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </div>
              </Row>
              <Row>
                <div>
                  <label>서비스 가격</label>
                  <input
                    name="servicePrice"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </div>
              </Row>
              <Row>
                <div>
                  <label>서비스 설명</label>
                  <input
                    name="serviceDesc"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </div>
              </Row>
              <Row>
                <div>
                  <label>서비스 동시 수용가능인원수</label>
                  <input
                    name="serviceCapacity"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </div>
              </Row>
              <Row>
                <Button
                  style={{
                    marginLeft: "0.5rem",
                    marginBottom: "1.5rem",
                    margin: "auto",
                  }}
                  onClick={onServiceSubmit}
                >
                  추가
                </Button>
              </Row>
              <Row>
                <SubTitle
                  style={{
                    marginBottom: "1rem",
                    margin: "auto",
                    fontWeight: "bold",
                  }}
                >
                  제공중인 서비스 목록
                </SubTitle>
              </Row>
              <Row>
                <Col>
                  {serviceList?.map((item, index) => (
                    <Row
                      key={index}
                      style={{
                        border: "2px solid",
                        borderRadius: "15px",
                        margin: ".5rem .5rem",
                        padding: ".5rem .5rem",
                      }}
                    >
                      <Col>
                        <Row>서비스명: {item.serviceName}</Row>
                        <Row>서비스 가격: {item.servicePrice}</Row>
                        <Row>서비스 설명: {item.serviceDesc}</Row>
                        <Row>
                          서비스 동시 수용가능인원수: {item.serviceCapacity}
                        </Row>
                      </Col>
                      <Col>
                        {/* 시간 관계상 수정 기능은 추후 추가 */}
                        {/* <Row>
                          <Button>수정</Button>
                        </Row> */}
                        {/* PROBLEM : 서비스 삭제 버튼 눌렀을 때 index에 타입 에러 뜸 */}
                        {/* <Row>
                          <Button onClick={deleteServiceHandler(index)}>삭제</Button>
                        </Row> */}
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
      <Row>
        <Button
          style={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={withdrawButtonHandler}
        >
          탈퇴
        </Button>
      </Row>
    </div>
  );
}
