import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
} from "./LoginStyle";

import { CustomAxiosPost } from "../../common/CustomAxios";
import { useRecoilState } from "recoil";
import { hospitalLoginState, THospital } from "../../state/HospitalState";
import { TUser, userState } from "../../state/UserState";
import { customAxios } from "../../utils/AxiosModule";

type LoginState = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [isCheckUser, setIsCheckUser] = useState<boolean>(false);
  const [logins, setLogins] = useState<LoginState>({
    email: "",
    password: "",
  });
  // 병원 상태 저장!
  const [hospital, setHospital] = useRecoilState<THospital>(hospitalLoginState);
  const [user, setUser] = useRecoilState<TUser>(userState);

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

  const handleLoginChecked = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // 만일 일반 유저가 로그인 했다면
    if (!isCheckUser) {
      try {
        const result = await customAxios.post("/api/login", logins);
        const { token, role, userStatus } = result.data.userToken;

        setUser({
          ...user,
          role,
          userStatus,
        });

        if (userStatus === "expired") {
          alert("탈퇴한 유저 입니다.");
          return;
        }

        localStorage.setItem("token", token);
        navigate("/");
      } catch (e) {
        alert("아이디 또는 비밀번호 오류입니다.");
      }
    } else {
      // 만일 병원 유저가 로그인 했다면
      try {
        const hospitalUser = await CustomAxiosPost.post(
          "/hospital/login",
          logins
        );
        const { hospitalName, hospitalState } = hospitalUser.data.data;

        setHospital({
          ...hospital,
          hospitalName,
          hospitalState,
        });

        if (hospitalState === "추가정보 미기입") {
          alert("추가정보를 기입해주세요.");
          navigate("/hospital-info");
          return;
        }
        alert(`로그인에 성공하였습니다.`);
        navigate("/");
      } catch (e: any) {
        const errorMsg = e.response.data.message;
        // errorMsg가 확인중일때는 아래와 같은 경고창을 띄워준다.
        if (errorMsg === "확인중") {
          alert(`관리자 승인 대기중입니다. \n승인 완료시까지 기다려주세요.`);
        }
      }
    }
  };

  const handleKakaoLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.location.href =
      "http://kdt-sw2-seoul-team14.elicecoding.com:5000/api/login/kakao";
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
          autoFocus
          sx={{ mb: 1 }}
        />
        <PasswordInput
          type="password"
          name="password"
          value={password}
          onChange={handleLoginState}
          label="비밀번호를 입력해주세요"
          variant="outlined"
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
          sx={{ mb: 1, bgcolor: "#F87474" }}
        >
          로그인
        </LoginButton>
        <KakaoButton
          variant="contained"
          type="submit"
          sx={{ mb: 1, bgcolor: "#fae100", color: "black" }}
          onClick={handleKakaoLogin}
        >
          카카오 로그인
        </KakaoButton>
        <Link to="/register">
          <RegisterButton variant="outlined" type="submit">
            회원 가입
          </RegisterButton>
        </Link>
      </LoginWrapper>
    </form>
  );
}

export default Login;
