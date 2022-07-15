import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';

import Search from './Search';

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
  border-bottom: 1.7px solid ${props => props.theme.palette.lightgray};
`;

const LogoContainer = styled.div`

`;

const Logo = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.palette.orange};
  &:hover {
    color: ${props => props.theme.palette.orange};
  }
`;

const BtnContainer = styled.div`
  position: relative;
`;

const LoginBtn = styled(Link)`
  border: 1px solid black;
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
`;

interface IProfile {
  profile: boolean,
}

const ProfileBtnbox = styled.div<IProfile>`
  transition: 0.3s all ease-in-out;
  animation: fade 0.3s 1 ease-in-out;
  @keyframes fade {
    from {
      opacity: ${props => props.profile ? 0 : 1};
    }
    to {
      opacity: ${props => props.profile ? 1 : 0};
    }
  }
  background-color: white;
  border: 1px solid black;
  width: 100px;
  height: 70px;
  position: absolute;
  top: 50px;
  right: -16px;
  border-radius: 10px;
`;

interface IIdx {
  num: string
}

const ProfileBtn = styled.div<IIdx>`
  width: 100%;
  height: 50%;
  cursor: pointer;
  padding-left: 6px;
  line-height: 35px;
  border-top-left-radius: ${props => props.num === 'first' && '10px'};
  border-top-right-radius: ${props => props.num === 'first' && '10px'};
  border-bottom-right-radius: ${props => props.num === 'last' && '10px'};
  border-bottom-left-radius: ${props => props.num === 'last' && '10px'};
  font-size: 14px;
  font-weight: 700;
  color: black;
  &:hover {
    background-color: ${props => props.theme.palette.lightgray};
    color: black;
  }
`;

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(localStorage.getItem('token') ? true : false);
  // const [isLogin, setIsLogin] = useState<boolean>(true); // 로그인 되었다고 가정한 가데이터
  const [profile, setProfile] = useState<boolean>(false); // 계정 아이콘 클릭 여부 체크

  // 마이페이지 클릭 시 role에 맞춰서 마이페이지 이동
  function handleNavigateMypage() {

  }

  // 로그아웃 클릭 시 로그아웃
  function handleLogout() {
    localStorage.removeItem('token');
    setIsLogin(false);
    setProfile(false);
  }

  return (
    <>
      <div>
        <HeaderContainer>
          <LogoContainer>
            <Logo to='/'>동물병원</Logo>
          </LogoContainer>
          <Search />
          <BtnContainer>
            {!isLogin && <LoginBtn to='/login'>로그인</LoginBtn>}
            {isLogin && <Profile icon={faCircleUser} size='3x' onClick={() => setProfile((cur => !cur))} />}
            {profile &&
              <ProfileBtnbox profile={profile}>
                <Link to='/user-mypage'>
                  <ProfileBtn num='first' onClick={handleNavigateMypage}>마이페이지</ProfileBtn>
                </Link>
                <Link to='/'>
                  <ProfileBtn num='last' onClick={handleLogout}>로그아웃</ProfileBtn>
                </Link>
              </ProfileBtnbox>
            }
          </BtnContainer>
        </HeaderContainer>
      </div>
      <Line />
    </>
  )
}
