import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { TUser, userState } from "../state/UserState";

import Search from "./Search";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { hospitalLoginState } from "../state/HospitalState";
import { CustomAxiosGet } from "../common/CustomAxios";

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 80px;
  margin: 10px 0;
`;

const Line = styled.div`
  border-bottom: 1.7px solid ${(props) => props.theme.palette.lightgray};
  margin-bottom: 40px;
`;

const LogoContainer = styled.div``;

const Logo = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.orange};
  &:hover {
    color: ${(props) => props.theme.palette.orange};
  }
`;

const LogoImg = styled.img`
  width: 140px;
`;

const BtnContainer = styled.div`
  position: relative;
`;

const LoginBtn = styled(Link)`
  border: 2px solid black;
  padding: 6px 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px;
  color: black;
  transition: 0.3s all ease-in-out;

  &:hover {
    color: white;
    background-color: black;
  }
`;

const Profile = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 0 16px;
  margin-right: auto;
  color: ${(props) => props.theme.palette.gray};
`;

interface IProfile {
  profile: string;
}

const ProfileBtnbox = styled.div<IProfile>`
  z-index: 1;
  transition: 0.3s all ease-in-out;
  background-color: white;
  border: 1px solid black;
  width: 100px;
  height: 70px;
  position: absolute;
  top: 45px;
  right: -20px;
  border-radius: 10px;
`;

interface IIdx {
  num: string;
}

const ProfileBtn = styled.div<IIdx>`
  width: 100%;
  height: 50%;
  cursor: pointer;
  padding-left: 6px;
  line-height: 35px;
  ${(props) =>
    props.num === "first" &&
    css`
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    `}
  ${(props) =>
    props.num === "last" &&
    css`
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    `}
  font-size: 14px;
  font-weight: 700;
  color: black;
  &:hover {
    background-color: ${(props) => props.theme.palette.lightgray};
    color: black;
  }
`;

interface ISearch {
  searchBox: boolean;
}

export default function Header({ searchBox }: ISearch) {
  const [isLogin, setIsLogin] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [profile, setProfile] = useState<boolean>(false); // 계정 아이콘 클릭 여부 체크
  const [role, setRole] = useRecoilState<TUser>(userState);
  const hospital = useRecoilValue(hospitalLoginState);
  const haveSearch = searchBox;
  const HospitalResetState = useResetRecoilState(hospitalLoginState);
  const UserResetState = useResetRecoilState(userState);

  const token = localStorage.getItem("token");

  useEffect(() => {
    !token && hospital.hospitalName === "" && setIsLogin(false);
  }, [token, hospital]);

  // 로그아웃 클릭 시 로그아웃
  async function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      UserResetState();
    } else {
      await CustomAxiosGet.get("/hospital/logout");
      HospitalResetState();
    }

    alert(`로그아웃이 완료되었습니다:)`);
    setIsLogin(false);
    setProfile(false);
  }

  return (
    <>
      <div>
        <HeaderContainer>
          <LogoContainer>
            <Logo to="/">
              <LogoImg src="/logo.jpg" />
            </Logo>
          </LogoContainer>
          {haveSearch && <Search />}
          <BtnContainer>
            {!isLogin && hospital.hospitalName === "" ? (
              <LoginBtn to="/login">로그인</LoginBtn>
            ) : (
              <Profile
                icon={faCircleUser}
                size="3x"
                onClick={() => setProfile((cur) => !cur)}
              />
            )}
            {profile && (
              <ProfileBtnbox profile="true">
                <Link
                  to={
                    role.role === "basic-user"
                      ? "/user-mypage"
                      : role.role === "admin"
                      ? "admin-mypage"
                      : "hospital-mypage"
                  }
                >
                  <ProfileBtn num="first" onClick={() => setProfile(false)}>
                    마이페이지
                  </ProfileBtn>
                </Link>
                <Link to="/">
                  <ProfileBtn num="last" onClick={handleLogout}>
                    로그아웃
                  </ProfileBtn>
                </Link>
              </ProfileBtnbox>
            )}
          </BtnContainer>
        </HeaderContainer>
      </div>
      <Line />
    </>
  );
}
