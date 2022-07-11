import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

// 로그인 타이틀
const LoginTitle = styled.h3`
  margin: 0 auto;
  width: 340px;
  height: 20px;
  padding-bottom: 36px;
`;

// Login을 둘러싸고 있는 Wrapper
const LoginWrapper = styled.div`
  width: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  text-align: center;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 12px;
`;

// input
const LoginInput = styled(TextField)`
  display: block;
  width: 340px;
  height: 54px;
`;

const PasswordInput = styled(LoginInput)``;

// button
const LoginButton = styled(Button)`
  display: block;
  width: 340px;
  height: 54px;
`;

// register Button
const RegisterButton = styled(LoginButton)``;
const KakaoButton = styled(LoginButton)``;

const UserCheckBox = styled.div`
  display: flex;
  width: 340px;
  margin: 0 auto;
  align-items: center;
`;

const UserInput = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export {
  LoginButton,
  LoginWrapper,
  LoginInput,
  LoginTitle,
  RegisterButton,
  KakaoButton,
  PasswordInput,
  UserCheckBox,
  UserInput,
};
