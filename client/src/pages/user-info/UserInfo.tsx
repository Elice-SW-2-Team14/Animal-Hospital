import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import { UserInfoType, Data, Address } from "./Interface";
import {
  MainContainer,
  Title,
  Form,
  Container,
  InputLabel,
  InfoInput,
  InfoBtn,
  DeactivateContainer,
  DeactiveBtn,
  Divider,
} from "../../components/InfoForm";
import { ModalStyle } from "../../components/ModalStyle";
import { CustomAxiosGet } from "../../common/CustomAxios";
import { useResetRecoilState } from "recoil";
import { userState } from "../../state/UserState";
import { hospitalLoginState } from "../../state/HospitalState";

function UserInfo() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // 받아온 정보를 저장하는 state
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    userName: "",
    address: { postalCode: "", address1: "", address2: "" },
    email: "",
    password: "",
    phoneNumber: "",
    userStatus: "",
  });
  // address 관련
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addr, setAddr] = useState<Address>({
    postalCode: "",
    address1: "",
    address2: "",
  });
  // 비밀번호 관련
  const currentPwRef = useRef<HTMLInputElement>(null);
  const newPwRef = useRef<HTMLInputElement>(null);

  // 처음 한 번만 서버 통신
  useEffect(() => {
    axios
      .get("http://kdt-sw2-seoul-team14.elicecoding.com:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        setAddr(res.data.address);
      });
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = {
      ...userInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    setUserInfo(data);
  };

  const onOpenClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const completeHandler = (data: Data) => {
    setIsOpen(false);
    const ex = {
      ...userInfo?.address,
      postalCode: data.zonecode,
      address1: data.roadAddress,
    };
    setAddr(ex);
  };

  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAddr({ ...addr, [event.currentTarget.name]: event.currentTarget.value });
  };

  const onhandleUpdate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const currentPassword = currentPwRef.current?.value;
    const newPassword = newPwRef.current?.value;
    const data = {
      ...userInfo,
      address: addr,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    axios.patch(
      `http://kdt-sw2-seoul-team14.elicecoding.com:5000/api/users/${userInfo?.email}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  // 로그아웃 함수
  const hospitalResetState = useResetRecoilState(hospitalLoginState);
  const userResetState = useResetRecoilState(userState);
  async function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      userResetState();
    } else {
      await CustomAxiosGet.get("/hospital/logout");
      hospitalResetState();
    }
  }

  const expiration = async () => {
    //TODO
    await axios
      .patch(
        `http://kdt-sw2-seoul-team14.elicecoding.com:5000/api/expiration
      `,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // alert(`${userInfo.userName}님 탈퇴가 완료되었습니다 🥲`);
        handleLogout();
        navigate("/");
      });
  };
  return (
    <MainContainer>
      <Title>개인정보</Title>
      <Form>
        <Container>
          <InputLabel>실명</InputLabel>
          <InfoInput
            name="userName"
            onChange={onChange}
            value={userInfo.userName}
          />
        </Container>
        <Container>
          <InputLabel>이메일 주소</InputLabel>
          <InfoInput name="email" value={userInfo.email} disabled />
        </Container>

        <Container>
          <InputLabel>전화번호</InputLabel>
          <InfoInput
            name="phoneNumber"
            onChange={onChange}
            value={userInfo.phoneNumber}
          />
        </Container>
        <Container>
          <InputLabel>주소</InputLabel>
          <InfoInput name="postalCode" value={addr.postalCode || ""} disabled />
          <InfoBtn onClick={onOpenClick}>주소찾기</InfoBtn>
          <Modal isOpen={isOpen} ariaHideApp={false} style={ModalStyle}>
            <DaumPostcode onComplete={completeHandler} />
          </Modal>
          <Divider>
            <InfoInput name="address1" value={addr.address1 || ""} disabled />
            <InfoInput
              name="address2"
              placeholder="상세주소를 입력해주세요"
              onChange={onAddressChange}
              value={addr.address2 || ""}
            />
          </Divider>
        </Container>
        <Container>
          <InputLabel>비밀번호 수정</InputLabel>
          <InfoInput ref={newPwRef} placeholder="새 비밀번호" />
        </Container>
        <Container>
          <InputLabel>비밀번호 확인</InputLabel>
          <InfoInput
            ref={currentPwRef}
            placeholder="정보 수정 시 현재 비밀번호를 입력해주세요"
          />
        </Container>

        <div style={{ display: "flex" }}>
          <InfoBtn style={{ marginLeft: "auto" }} onClick={onhandleUpdate}>
            수정
          </InfoBtn>
        </div>
      </Form>
      <DeactivateContainer>
        <p>Animal Hospital에서 탈퇴하고 싶으신가요?</p>
        <DeactiveBtn onClick={expiration}>탈퇴하기</DeactiveBtn>
      </DeactivateContainer>
    </MainContainer>
  );
}

export default UserInfo;
