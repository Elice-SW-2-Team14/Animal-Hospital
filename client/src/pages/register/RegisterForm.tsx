import React, {useState} from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4px;
`;

const SearchAddr = styled(Button)`
  width: 100px;
  text-align: center;
`

const RegisterBtn = styled.button`
  width: 120px;
  height: 40px;
  margin: 20px 0;
  text-align: center;
  background-color: ${props => props.theme.palette.blue};
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.1s ease-in;
  border-radius: 4px;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
`

const RegisterBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`



interface Props {
  isHospital: boolean,
}



const  RegisterForm: React.FC<Props> = ({isHospital}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPwd, setCheckPwd] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [postal, setPostal] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');

  const [hospitalname, setHospitalname] = useState<string>('');
  const [CRN, setCRN] = useState<string>('');
  const [license, setLicense] = useState<string>('');

  function handleSubmit(e:React.MouseEvent<HTMLElement>) {
    e.preventDefault();
  }

  return (
    <>
      <form>
        {isHospital && 
          <Input
          placeholder="병원 이름을 입력해주세요"
          value = {hospitalname}
          onChange = {(e) => setHospitalname(e.target.value)}
          style={{ marginTop: "1rem" }}
        />
        }
        <Input
          placeholder="이름을 입력해주세요"
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        />
        <Input
          placeholder="이메일을 입력해주세요"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Input
          placeholder="비밀번호를 입력해주세요"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Input
          placeholder="비밀번호를 다시 입력해주세요"
          value = {checkPwd}
          onChange = {(e) => setCheckPwd(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Input
          placeholder="전화번호를 입력해주세요" 
          value = {phone}
          onChange = {(e) => setPhone(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <AddressContainer>
          <Input
            placeholder="우편번호"
            style={{ marginBottom: "0.5rem" }}
          />
          <SearchAddr>주소 찾기</SearchAddr>
          <Input
            placeholder="주소"
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="상세주소"
            style={{ marginBottom: "1rem" }}
          />
        </AddressContainer>
        {isHospital &&
          <div>
            <Input
            placeholder="사업자 등록번호를 입력해주세요"
            value = {CRN}
            onChange = {(e) => setCRN(e.target.value)}
            style={{ marginBottom: "1rem" }}
            />
            <Input
            placeholder="면허 번호를 입력해주세요"
            value = {license}
            onChange = {(e) => setLicense(e.target.value)}
            style={{ marginBottom: "1rem" }}
            />
          </div>
        }
        <RegisterBtnContainer>
          <RegisterBtn type="submit" onClick={handleSubmit}>회원가입</RegisterBtn>
        </RegisterBtnContainer>
      </form>
    </>
  )
}

export default RegisterForm;