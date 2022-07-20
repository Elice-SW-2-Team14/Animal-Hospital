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

const token = localStorage.getItem("token");
function UserInfo() {
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
      .get("http://localhost:5100/api/user", {
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
    axios
      .patch(`http://localhost:5100/api/users/${userInfo?.email}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("수정이 완료되었습니다 👍");

        // 수정할 때 마다 입력해야함 + 새로운 비밀번호는 입력하지 않아도 됨
        // 현재 비밀번호 위치를 수정 옆으로?
      });
  };
  const expiration = () => {
    //TODO
    axios
      .patch(
        `http://localhost:5100/api/expiration
      `,
        { userStatus: `${userInfo.userStatus}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert(`${userInfo.userName}님 탈퇴가 완료되었습니다 🥲`);
        localStorage.removeItem("token");
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
          <InfoInput ref={currentPwRef} placeholder="현재 비밀번호" />
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
