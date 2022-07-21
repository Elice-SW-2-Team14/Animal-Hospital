// react와 vanilla js 혼종인 파일이다. 리액트로 서서히 바꿔나가자
// 우선순위 높은 남은 기능들: 정보 수정 시 validation 추가, 회원 탈퇴 시 비밀번호 확인 추가
import React, { useState, useCallback, useEffect, useRef } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import { HospitalInfoType, HospitalServiceInfoType, Data } from "./Interface";
import "antd/dist/antd.min.css";
import { Form, Row, Col } from "antd";
import { theme } from "../../styles/Colors";
import {
  HospitalContainer,
  Container,
  UploadFileLabel,
  UploadFileInput,
  CategoryLabel,
  DayLabel,
  TimeLabel,
  KeywordInput,
} from "./Style";
import { ModalStyle } from "../../components/ModalStyle";
import { PasswordModalStyle } from "../../components/PasswordModalStyle";
import {
  Title,
  InputLabel,
  InfoInput,
  InfoBtn,
  DeactivateContainer,
  DeactiveBtn,
} from "../../components/InfoForm";
import axios from "axios";
import { useRecoilState } from "recoil";
import { hospitalLoginState } from "../../state/HospitalState";
import { useNavigate } from "react-router-dom";

export default function HospitalInfo() {
  const [info, setInfo] = useRecoilState(hospitalLoginState);
  console.log(info);
  // 폼 내용들은 입력 시마다 내용이 곧바로 저장되므로 추후 debouncing 적용 예정

  let navigate = useNavigate();

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
    businessHours: [],
    businessNumber: "",
    licenseNumber: "",
    holiday: [],
    hospitalCapacity: 0,
    tag: [],
    keyword: [],
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
  const [keyword, setKeyword] = useState<string[] | undefined>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  /* address modal */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  /* password modal */
  const [isPassOpen, setIsPassOpen] = useState<boolean>(false);

  /* password */
  const [currPassword, setCurrPassword] = useState<string>("");
  // const currentPwRef = useRef<HTMLInputElement>(null);
  // const newPwRef = useRef<HTMLInputElement>(null);

  /* constants */
  const AVAILABLE_KEYWORD_LENGTH = 10;
  const AVAILABLE_KEYWORD_COUNTS = 3;
  const CATEGORY_LIST = [
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
  const DAY_LIST = ["월", "화", "수", "목", "금", "토", "일"];
  const TIME_LIST = [
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

  /* image converter */
  const convertFileToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve: any) => {
      if (reader) {
        reader.onload = () => {
          setHospitalInfo((prev) => {
            return { ...prev, image: reader.result as string };
          });
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
    const currPassData = e.currentTarget.value;
    setHospitalInfo(hospitalData);
    setCurrPassword(currPassData);
    // setHospitalServiceInfo(hospitalServiceData);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setHospitalInfo((prev) => {
      return { ...prev, postalCode: e.target.value };
    });
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
        setKeyword(keyword!.filter((newKeyword: any) => newKeyword));
        setHospitalInfo((prev) => {
          return {
            ...prev,
            keyword: keyword as string[],
          };
        });
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
          const keywords = [...keyword!, newKeyword];
          setHospitalInfo((prev) => {
            return {
              ...prev,
              keyword: keywords,
            };
          });
          $keywordNumWarning.textContent =
            "키워드가 정상적으로 등록되었습니다.";
          setNewKeyword("");
        } else {
          $keywordNumWarning.textContent = `키워드는 ${AVAILABLE_KEYWORD_COUNTS}개까지 등록 가능합니다.`;
          setNewKeyword("");
          console.log("초과 등록 실패");
        }
      }
    },
    [keyword, newKeyword, $HashWrapInner, $HashWrapOuter, $keywordNumWarning]
  );

  const onServiceSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("서비스 추가 버튼 클릭");
    console.log("추가된 서비스:", hospitalServiceInfo);
    setServiceList([...serviceList, hospitalServiceInfo]);
    setHospitalServiceInfo({
      serviceName: "",
      servicePrice: 0,
      serviceDesc: "",
      serviceCapacity: 0,
    });
    console.log("serviceList:", serviceList);
  };

  /* onClick handlers */

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // alert(
    //   '버튼이 클릭되었습니다(확인용)'
    // )
  };

  const onOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const onPassOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsPassOpen(!isPassOpen);
  };

  const completeHandler = (data: Data) => {
    setIsOpen(false);
    const ex = {
      ...hospitalInfo.address,
      postalCode: data.zonecode,
      address1: data.roadAddress,
    };
    setHospitalInfo((prev) => {
      return { ...prev, address: ex };
    });
  };

  const checkCategoryHandler = ({ target }: any) => {
    setIsChecked(!isChecked);
    checkedCategoryHandler(target.parentNode, target.value, target.checked);
  };

  const checkedCategoryHandler = (box: any, id: any, isChecked: any) => {
    const categoryList = [...hospitalInfo.tag!];
    if (isChecked) {
      categoryList.push(id);
      box.style.borderColor = theme.palette.blue;
      box.style.color = theme.palette.blue;
    } else if (!isChecked && categoryList.find((i) => i === id)) {
      box.style.borderColor = theme.palette.lightgray;
      box.style.color = "black";
      const index = categoryList.indexOf(id);
      if (index !== -1) {
        categoryList.splice(index, 1);
      }
    }
    if (categoryList[0] === "") {
      categoryList.splice(0, 1);
    }
    setHospitalInfo((prev) => {
      return { ...prev, tag: categoryList };
    });
  };

  const checkDayHandler = ({ target }: any) => {
    setIsChecked(!isChecked);
    checkedDayHandler(target.parentNode, target.value, target.checked);
  };

  const checkedDayHandler = (box: any, id: any, isChecked: any) => {
    const dayList = [...hospitalInfo.holiday!];
    if (isChecked) {
      dayList.push(id);
      box.style.borderColor = theme.palette.blue;
      box.style.color = theme.palette.blue;
    } else if (!isChecked && dayList.find((i) => i === id)) {
      box.style.borderColor = theme.palette.lightgray;
      box.style.color = "black";
      const index = dayList.indexOf(id);
      if (index !== -1) {
        dayList.splice(index, 1);
      }
    }
    if (dayList[0] === "") {
      dayList.splice(0, 1);
    }
    setHospitalInfo((prev) => {
      return { ...prev, holiday: dayList };
    });
  };

  const checkBusinessHoursHandler = ({ target }: any) => {
    setIsChecked(!isChecked);
    checkedBusinessHoursHandler(
      target.parentNode,
      target.value,
      target.checked
    );
  };

  const checkedBusinessHoursHandler = (box: any, id: any, isChecked: any) => {
    const businessHoursList = [...hospitalInfo.businessHours!];
    if (isChecked) {
      businessHoursList.push(id);
      box.style.borderColor = theme.palette.blue;
      box.style.color = theme.palette.blue;
    } else if (!isChecked && businessHoursList.find((i) => i === id)) {
      box.style.borderColor = theme.palette.lightgray;
      box.style.color = "black";
      const index = businessHoursList.indexOf(id);
      if (index !== -1) {
        businessHoursList.splice(index, 1);
      }
    }
    if (businessHoursList[0] === "") {
      businessHoursList.splice(0, 1);
    }
    setHospitalInfo((prev) => {
      return { ...prev, businessHours: businessHoursList };
    });
  };

  const withdrawButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("현재 비밀번호:", currPassword);
    const data = { currentPassword: currPassword };
    const response = await axios.patch(
      "http://localhost:5100/hospital/withdrawal",
      data,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    console.log("병원 회원 탈퇴가 진행됩니다.");
    alert("탈퇴되었습니다.");
    navigate("/login");
  };

  const onhandleUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = { ...hospitalInfo };
    await axios.patch("http://localhost:5100/hospital", data, {
      withCredentials: true,
    });
    console.log(data);
  };
  // PROBLEM: 서비스 삭제 버튼 눌렀을 때 타입 오류 뜸
  // function deleteServiceHandler(e:React.MouseEvent<Element>, index) {
  //   // setServiceList(serviceList.splice(index, 1));
  //   console.log(index, '서비스가 삭제되었습니다.');
  // }

  // useEffect(() => {
  //   // 임시 데이터 (api 추가 후 삭제 예정)
  //   setHospitalInfo({
  //     ~~hospitalInfo는 get 완료했고 길어서 자름. service도 완성하면 주석 삭제~
  //   });
  //   setHospitalServiceInfo(
  //   {
  //     "serviceName": "중성화수술",
  //     "servicePrice": 200000,
  //     "serviceDesc": "지이이잉석둑",
  //     "serviceCapacity": 1
  //   });
  // }, []);
  useEffect(() => {
    async function getData() {
      try {
        //응답 성공
        // api
        const API_URL = "http://localhost:5100/hospital/detail";
        const response = await axios.get(API_URL, {
          withCredentials: true,
        });
        console.log("응답 성공", response);
        setHospitalInfo(response.data.data.hospDetailInfo);
      } catch (error) {
        //응답 실패
        console.error("응답 실패", error);
      }
      // 서비스 api 완성되면 서비스 get 요청도 추가
    }
    getData();
  }, []);

  console.log("hospital data:", hospitalInfo);

  return (
    <div style={{ margin: "0 2rem 2rem 2rem" }}>
      <HospitalContainer>
        <div className="ant-typography">
          <Title>병원정보</Title>
        </div>
        <Row>
          <Col span={12}>
            <Form name="hospitalInfoForm">
              <Row>
                <Container>
                  <InputLabel>병원명</InputLabel>
                  <InfoInput
                    name="name"
                    style={{
                      width: "12rem",
                      marginLeft: "0.5rem",
                    }}
                    type="text"
                    defaultValue={hospitalInfo.name || ""}
                    onChange={onChange}
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <InputLabel>이름</InputLabel>
                  <InfoInput
                    name="director"
                    style={{ marginLeft: "0.5rem" }}
                    type="text"
                    defaultValue={hospitalInfo.director || ""}
                    onChange={onChange}
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <InputLabel>이메일</InputLabel>
                  <InfoInput
                    name="email"
                    style={{
                      width: "12rem",
                      marginLeft: "0.5rem",
                    }}
                    type="text"
                    defaultValue={hospitalInfo.email}
                    autoComplete="username"
                    disabled
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <InputLabel>새 비밀번호</InputLabel>
                  {/* <input ref={newPwRef} placeholder="새 비밀번호" />
                  <input ref={currentPwRef} placeholder="현재 비밀번호" /> */}
                  <InfoInput
                    name="password"
                    style={{ marginLeft: "0.5rem" }}
                    type="password"
                    autoComplete="current-password"
                    defaultValue=""
                  />
                  {/* 유저 정보 페이지와의 통일감을 위해 현재 비밀번호 input과 수정 버튼은 아래에 */}
                  {/* <InfoBtn
                    style={{ marginLeft: "0.5rem" }}
                    onClick={buttonHandler}
                  >변경</InfoBtn> */}
                </Container>
              </Row>
              <Row>
                <Container>
                  <InputLabel>병원 연락처</InputLabel>
                  <InfoInput
                    name="phoneNumber"
                    style={{ marginLeft: "0.5rem" }}
                    type="text"
                    defaultValue={hospitalInfo.phoneNumber || ""}
                    onChange={onChange}
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <InputLabel>사업자 등록번호</InputLabel>
                  <InfoInput
                    name="businessNumber"
                    style={{ marginLeft: "0.5rem" }}
                    type="text"
                    defaultValue={hospitalInfo?.businessNumber || ""}
                    onChange={onChange}
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <InputLabel>면허번호</InputLabel>
                  <InfoInput
                    name="licenseNumber"
                    style={{ marginLeft: "0.5rem" }}
                    type="text"
                    defaultValue={hospitalInfo?.licenseNumber || ""}
                    onChange={onChange}
                  />
                </Container>
              </Row>
              <Row>
                <InputLabel>병원 사진</InputLabel>
                <div style={{ marginBottom: "0.5rem" }} />
                <div style={{ marginLeft: "0.5rem", marginBottom: "0.5rem" }}>
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
                <div>
                  {hospitalInfo.image && (
                    <img src={hospitalInfo.image} width="280px" alt="" />
                  )}
                </div>
              </Row>
              <div style={{ marginBottom: "0.5rem" }} />
              <Row>
                <Container>
                  <Col>
                    <Row>
                      <InputLabel style={{ marginBottom: "0.5rem" }}>
                        주소
                      </InputLabel>
                    </Row>
                    <Row>
                      <InfoInput
                        name="postalCode"
                        style={{
                          marginBottom: "0.5rem",
                          marginLeft: "0.5rem",
                          width: "6rem",
                        }}
                        type="text"
                        defaultValue={hospitalInfo?.address?.postalCode || ""}
                        onChange={onChangeAddress}
                      />
                    </Row>
                    <Row>
                      <InfoInput
                        name="address1"
                        style={{
                          marginBottom: "0.5rem",
                          marginLeft: "0.5rem",
                          width: "20rem",
                        }}
                        type="text"
                        defaultValue={hospitalInfo?.address?.address1}
                        onChange={onChangeAddress}
                      />
                    </Row>
                    <Row>
                      <InfoInput
                        name="address2"
                        style={{
                          marginLeft: "0.5rem",
                          width: "18rem",
                        }}
                        type="text"
                        defaultValue={hospitalInfo?.address?.address2}
                        onChange={onChangeAddress}
                      />
                      <InfoBtn
                        style={{ marginLeft: "0.5rem" }}
                        onClick={onOpenClick}
                      >
                        수정
                      </InfoBtn>
                    </Row>
                  </Col>
                  <Modal isOpen={isOpen} ariaHideApp={false} style={ModalStyle}>
                    <DaumPostcode onComplete={completeHandler} />
                  </Modal>
                </Container>
              </Row>
              <Row>
                <InputLabel style={{ marginBottom: "0.5rem" }}>
                  카테고리
                </InputLabel>
              </Row>
              <Row>
                {CATEGORY_LIST.map((category) => (
                  <Row key={category + "Row"}>
                    <CategoryLabel htmlFor={category} key={category + "L"}>
                      <InfoInput
                        type="checkbox"
                        id={category}
                        key={category}
                        onChange={(e) => checkCategoryHandler(e)}
                        value={category}
                        hidden
                      />
                      {category}
                    </CategoryLabel>
                  </Row>
                ))}
              </Row>
              <Row>
                <InputLabel style={{ marginTop: "1rem" }}>키워드</InputLabel>
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
                  <InfoInput
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
                  <InputLabel>영업시간</InputLabel>
                  <Row>
                    {TIME_LIST.map((time) => (
                      <TimeLabel htmlFor={time} key={time + "L"}>
                        <input
                          type="checkbox"
                          id={time}
                          key={time}
                          onClick={checkBusinessHoursHandler}
                          value={time}
                          hidden
                        />
                        {time}:00
                      </TimeLabel>
                    ))}
                  </Row>
                  <Row style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                    <InputLabel>휴무일 선택</InputLabel>
                  </Row>
                  <Row>
                    {DAY_LIST.map((day) => (
                      <DayLabel htmlFor={day} key={day + "L"}>
                        <input
                          type="checkbox"
                          id={day}
                          key={day}
                          onChange={(e) => checkDayHandler(e)}
                          value={day}
                          hidden
                        />
                        {day}
                      </DayLabel>
                    ))}
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
                  </Row>
                  <Row style={{ marginTop: "1rem" }}>
                    <Container>
                      <InputLabel>시간당 예약가능 고객 수</InputLabel>
                      <InfoInput
                        name="hospitalCapacity"
                        style={{ marginLeft: "0.5rem" }}
                        type="text"
                        defaultValue={hospitalInfo?.hospitalCapacity || 0}
                        onChange={onChange}
                      />
                    </Container>
                  </Row>
                  <Row>
                    <InfoBtn
                      style={{
                        marginLeft: "0.5rem",
                        marginBottom: "1.5rem",
                        margin: "auto",
                      }}
                      onClick={onhandleUpdate}
                    >
                      저장
                    </InfoBtn>
                  </Row>
                  {/* <Row>
                    <Button onClick={() => {
                      console.log(hospitalInfo)
                    }}>개발자 확인 버튼</Button>
                  </Row> */}
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Form>
              <Row>
                <InputLabel
                  style={{
                    margin: "auto",
                    fontWeight: "bold",
                  }}
                >
                  서비스 추가
                </InputLabel>
              </Row>
              <Row>
                <Container>
                  <label>서비스명</label>
                  <InfoInput
                    name="serviceName"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <label>서비스 가격</label>
                  <InfoInput
                    name="servicePrice"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <label>서비스 설명</label>
                  <InfoInput
                    name="serviceDesc"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </Container>
              </Row>
              <Row>
                <Container>
                  <label>서비스 동시 수용가능인원수</label>
                  <InfoInput
                    name="serviceCapacity"
                    onChange={onChange}
                    style={{
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  />
                </Container>
              </Row>
              <Row>
                <InfoBtn
                  style={{
                    marginLeft: "0.5rem",
                    marginBottom: "1.5rem",
                    margin: "auto",
                  }}
                  onClick={onServiceSubmit}
                >
                  추가
                </InfoBtn>
              </Row>
              <Row>
                <InputLabel
                  style={{
                    marginTop: "2rem",
                    marginBottom: "1rem",
                    margin: "auto",
                    fontWeight: "bold",
                  }}
                >
                  제공중인 서비스 목록
                </InputLabel>
              </Row>
              <Row>
                <Col style={{ margin: "auto" }}>
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
                      <Col key={index + "Col1"}>
                        <Row key={index + "N"}>
                          서비스명: {item.serviceName}
                        </Row>
                        <Row key={index + "P"}>
                          서비스 가격: {item.servicePrice}
                        </Row>
                        <Row key={index + "D"}>
                          서비스 설명: {item.serviceDesc}
                        </Row>
                        <Row key={index + "C"}>
                          서비스 동시 수용가능인원수: {item.serviceCapacity}
                        </Row>
                      </Col>
                      {/* <Col> */}
                      {/* 시간 관계상 수정 기능은 추후 추가 */}
                      {/* <Row>
                          <Button>수정</Button>
                        </Row> */}
                      {/* PROBLEM : 서비스 삭제 버튼 눌렀을 때 index에 타입 에러 뜸 */}
                      {/* <Row>
                          <Button onClick={deleteServiceHandler(index)}>삭제</Button>
                        </Row> */}
                      {/* </Col> */}
                    </Row>
                  ))}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </HospitalContainer>
      <DeactivateContainer>
        <p>Animal Hospital에서 탈퇴하고 싶으신가요?</p>
        <DeactiveBtn onClick={onPassOpenClick}>탈퇴하기</DeactiveBtn>
        <Modal
          isOpen={isPassOpen}
          ariaHideApp={false}
          style={PasswordModalStyle}
        >
          <HospitalContainer
            style={{
              position: "absolute",
              top: "18%",
              left: "30%",
              maxWidth: "16rem",
            }}
          >
            <Container style={{ margin: "auto" }}>
              <InputLabel style={{ marginBottom: "1rem" }}>
                비밀번호를 입력해주세요.
              </InputLabel>
              <InfoInput
                type="password"
                name="currPassword"
                onChange={onChange}
              />
            </Container>
            <InfoBtn onClick={withdrawButtonHandler}>확인</InfoBtn>
          </HospitalContainer>
        </Modal>
      </DeactivateContainer>
    </div>
  );
}
