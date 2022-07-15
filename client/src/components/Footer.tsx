import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons';

const Container = styled.div`
  background-color: black;
  color: white;
  padding: 30px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: column;
    padding: 20px 0 10px;
  }
`;

const Team = styled.h2`
  font-size: 28px;
  color: white;
  text-align: center;
`;

const Member = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  text-align: center;
  
  @media screen and (max-width: 780px) {
    margin-bottom: 15px;
  }
`;

const LinkBtn = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  @media screen and (max-width: 780px) {
    margin-bottom: 16px;
    margin-top: 20px;
  }
`;

const Role = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Year = styled.p`
  text-align: center;
  margin-top: 8px;
`;

const Contact = styled(Role)`
  margin-bottom: 30px;

  @media screen and (max-width: 780px) {
    margin-top: 20px;
    margin-bottom: 16px;
  }
`
const EtcContainer = styled.div`
  @media screen and (max-width: 780px) {
    display: none;
  }
`

export default function Footer() {
  return (
    <Container>
      <div>
        <Team>Team 14</Team>
        <Year>@2022 Copyright by Team14</Year>
        <LinkBtn href='https://github.com/Elice-SW-2-Team14/Animal-Hospital.git'>
          <FontAwesomeIcon icon={faGithub} size='3x' color='white' />
        </LinkBtn>
      </div>
      <div>
        <Role>BACK</Role>
        <Member>권재구 권필주</Member>
        <Role>FRONT</Role>
        <Member>김다운 김호진 박민수 이지민</Member>
      </div>
      <EtcContainer>
        <Contact>CONTACT</Contact>
        <Member>서울 성수 낙낙 2층</Member>
        <Member>DM으로 문의 부탁드립니다🙏</Member>
      </EtcContainer>
    </Container>
  )
}
