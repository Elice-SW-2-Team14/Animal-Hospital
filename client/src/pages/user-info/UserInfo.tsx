import React from "react";
import {
  MainContainer,
  Title,
  Form,
  Container,
  InputLabel,
  InfoInput,
  InfoBtn,
  Divider,
  DeactivateContainer,
  DeactiveBtn,
} from "../../components/InfoForm";

const onhandleUpadate = (event: React.MouseEvent<HTMLElement>) => {
  event.preventDefault();
  console.log("click", event);
};
function UserInfo() {
  return (
    <MainContainer>
      <Title>개인정보</Title>
      <Form>
        <Container>
          <InputLabel>실명</InputLabel>
          <InfoInput value="name" />
        </Container>
        <Container>
          <InputLabel>이메일 주소</InputLabel>
          <InfoInput value="email@email.com" disabled />
        </Container>
        <Container>
          <InputLabel>비밀번호</InputLabel>
          <InfoInput value="password" />
          <InfoBtn>확인</InfoBtn>
        </Container>
        <Container>
          <InputLabel>전회번호</InputLabel>
          <InfoInput value="010-1234-5678" />
        </Container>

        <Container>
          <InputLabel>주소</InputLabel>
          <InfoInput value="우편번호" />
          <InfoBtn>주소찾기</InfoBtn>
          <Divider>
            <InfoInput value="주소" />
            <InfoInput value="상세주소" />
          </Divider>
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
