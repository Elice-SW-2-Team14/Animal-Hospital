import React, { useState } from 'react';

import {
  LoginWrapper,
  LoginInput,
  LoginButton,
  LoginTitle,
  RegisterButton,
  KakaoButton,
  PasswordInput,
  UserCheckBox,
  UserInput,
} from './LoginStyle';

import axios from 'axios';

type LoginState = {
  email: string;
  password: string;
};

function LoginLayout() {
  const [isCheckUser, setIsCheckUser] = useState<boolean>(false);
  const [logins, setLogins] = useState<LoginState>({
    email: '',
    password: '',
  });

  // 비구조화 할당으로 email , password 값을 추출한다.
  const { email, password } = logins;

  // state를 사용하여 login 값 관리
  const handleLoginState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLogins({
      ...logins,
      [name]: value,
    });
  };

  const handleLoginChecked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(logins);

    // 로그인 버튼 클릭시에 입력한 이메일을 기준으로 백엔드에서 데이터를 찾고 그 이메일을 기준으로 password까지 확인해서 맞으면 pass시키고 틀리면 fail 시킨다.
    axios.get('유저 정보 url 접근').then((res) => console.log(res));
  };

  return (
    <form>
      <LoginWrapper>
        <LoginTitle>로그인</LoginTitle>
        <LoginInput
          name="email"
          value={email}
          onChange={handleLoginState}
          label="이메일을 입력해주세요"
          variant="outlined"
          required
          autoFocus
          sx={{ mb: 1 }}
        />
        <PasswordInput
          name="password"
          value={password}
          onChange={handleLoginState}
          label="비밀번호를 입력해주세요"
          variant="outlined"
          required
          sx={{ mb: 1 }}
        />
        <UserCheckBox>
          <UserInput
            onClick={() => setIsCheckUser(!isCheckUser)}
            type="checkbox"
            id="hospital"
            name="hospital"
          />
          <label htmlFor="hospital">병원 회원</label>
        </UserCheckBox>
        <LoginButton
          onClick={handleLoginChecked}
          variant="contained"
          type="submit"
          sx={{ mb: 1, bgcolor: '#F87474' }}
        >
          로그인
        </LoginButton>
        <KakaoButton
          variant="contained"
          type="submit"
          sx={{ mb: 1, bgcolor: '#fae100', color: 'black' }}
        >
          카카오 로그인
        </KakaoButton>
        <RegisterButton variant="outlined" type="submit">
          회원 가입
        </RegisterButton>
      </LoginWrapper>
    </form>
  );
}

export default LoginLayout;
