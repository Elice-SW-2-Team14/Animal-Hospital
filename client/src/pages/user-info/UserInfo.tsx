import React, { useRef, useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import axios from "axios";
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
  // 받아온 정보를 저장하는 state
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  // address 관련
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addr, setAddr] = useState<Address>();
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

  // interface AddressType {
  //   postalCode: string;
  //   address1: string;
  //   address2: string;
  // }
  // const { postalCode, address1, address2 }: AddressType = userInfo?.address; // undefined?
  //const address = userInfo?.address; // destructuring?

  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAddr({ ...addr, [event.currentTarget.name]: event.currentTarget.value });
  };

  const onhandleUpadate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const currentPassword = currentPwRef.current?.value;
    const newPassword = newPwRef.current?.value;
    const data = {
      ...userInfo,
      address: addr,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    console.log(data);
    axios
      .patch(`http://localhost:5100/api/users/${userInfo?.email}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
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
            value={userInfo?.userName || ""}
          />
        </Container>
        <Container>
          <InputLabel>이메일 주소</InputLabel>
          <InfoInput name="email" value={userInfo?.email || ""} disabled />
        </Container>

        <Container>
          <InputLabel>전회번호</InputLabel>
          <InfoInput
            name="phoneNumber"
            onChange={onChange}
            value={userInfo?.phoneNumber || ""}
          />
        </Container>
        <Container>
          <InputLabel>주소</InputLabel>
          <InfoInput
            name="postalCode"
            value={addr?.postalCode || ""}
            disabled
          />
          <InfoBtn onClick={onOpenClick}>주소찾기</InfoBtn>
          <Modal isOpen={isOpen} ariaHideApp={false} style={ModalStyle}>
            <DaumPostcode onComplete={completeHandler} />
          </Modal>
          <Divider>
            <InfoInput name="address1" value={addr?.address1 || ""} disabled />
            <InfoInput
              name="address2"
              onChange={onAddressChange}
              value={addr?.address2 || ""}
            />
          </Divider>
        </Container>
        <Container>
          <InputLabel>비밀번호</InputLabel>
          <InfoInput ref={newPwRef} placeholder="새 비밀번호" />
          <InfoInput ref={currentPwRef} placeholder="현재 비밀번호" />
        </Container>

        <div style={{ display: "flex" }}>
          <InfoBtn style={{ marginLeft: "auto" }} onClick={onhandleUpadate}>
            수정
          </InfoBtn>
        </div>
      </Form>
      <DeactivateContainer>
        <p>Animal Hospital에서 탈퇴하고 싶으신가요?</p>
        <DeactiveBtn onClick={() => alert("탈퇴 ㄲ")}>탈퇴하기</DeactiveBtn>
      </DeactivateContainer>
    </MainContainer>
  );
}

export default UserInfo;
