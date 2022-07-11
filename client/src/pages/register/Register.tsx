import React, {useState} from "react";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Button } from 'antd';

import Title from './Title';
import RegisterForm from './RegisterForm'

const Container = styled.div`
  margin: 10px 0;
  width: 500px;
  padding: 28px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Welcome = styled.h3`
  margin-bottom: 40px;
`

const BtnContainer = styled.div`
  display: flex;
`

interface IButtonProps {
  isHospital: boolean
}
const UserSelectBtn = styled.button<IButtonProps>`
  margin-right: 4px;

  background-color: ${props => !props.isHospital ? props => props.theme.palette.blue : 'white'};
  color: ${props => !props.isHospital ? 'white' : props.theme.palette.blue};
  border: 1px solid ${props => props.theme.palette.blue};
  padding: 8px;
  transition: all 0.2s ease-in-out;
  font-weight: ${props => !props.isHospital ? 'bold' : 'normal'};
  cursor: pointer;
  border-radius: 5px;
  width: 50%;
  font-size: 16px;

  &:hover {
    background-color: ${props => props.theme.palette.blue};
    color: white;
  }
`

const HospitalSelectBtn = styled(UserSelectBtn)<IButtonProps>`
  margin-right: 0;
  background-color: ${props => props.isHospital ? props => props.theme.palette.blue : 'white'};
  color: ${props => props.isHospital ? 'white' : props.theme.palette.blue};
  font-weight: ${props => props.isHospital ? 'bold' : 'normal'};
`

export default function Register () {
  const [isHospital, setIsHospital] = useState<boolean>(false);

  return (
    <Container>
      <Title title='회원가입' />
      <Welcome>동물병원에 오신 것을 환영합니다:)</Welcome>
      <BtnContainer>
        <UserSelectBtn isHospital={isHospital} onClick={() => setIsHospital(false)}>
          일반 회원
        </UserSelectBtn>
        <HospitalSelectBtn isHospital={isHospital} onClick={() => setIsHospital(true)}>
          병원 회원
        </HospitalSelectBtn>
      </BtnContainer>

      <RegisterForm isHospital={isHospital} />
    </Container>
  )
}