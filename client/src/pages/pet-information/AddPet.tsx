import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ImgUploader from "../../components/ImgUploader";
import {
  PetCardContainer,
  DeleteBtn,
  ImgContainer,
  InfoContainer,
  InfoInput,
  InfoTextarea,
  NameInput,
  RadioButton,
  RadioButtonLabel,
  RadioContainer,
  RadioText,
  Item,
  PetImg,
  Contents,
} from "./PetInfoStyle";
const Container = styled.form`
  padding: 1rem;
  border: 2px solid ${(props) => props.theme.palette.lightgray};
`;
const AddInput = styled(InfoInput)`
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.lightgray};
`;
const AddTextarea = styled(InfoTextarea)`
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.lightgray};
`;

const token = localStorage.getItem("token");
function AddPet() {
  const [select, setSelect] = useState("F");
  const [img, setImg] = useState();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const medicalHistoryRef = useRef<HTMLTextAreaElement>(null);
  const vaccinationRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      weight: weightRef.current?.value,
      species: speciesRef.current?.value,
      breed: breedRef.current?.value,
      medicalHistory: medicalHistoryRef.current?.value,
      vaccination: vaccinationRef.current?.value,
      sex: "F",
      // neutralized: ageRef.current?.value,
    };
    console.log(data);
    axios
      .post("http://localhost:5100/pet/register", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
    formRef.current?.reset(); // 저장 후 form 초기화
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelect(value);
  };
  const updateImg = ({ newImgs }: any) => {
    setImg(newImgs);
  };
  return (
    <Container ref={formRef}>
      <ImgContainer>
        <ImgUploader updateImg={updateImg} />
        {/* <PetImg src="https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516345?k=20&m=1213516345&s=612x612&w=0&h=_XUSwcrXe5HjI2QEby0ex6Tl1fB_YJUzUU8o2cUt0YA=" /> */}
      </ImgContainer>
      <InfoContainer>
        <AddInput placeholder="이름" ref={nameRef} />
        <Contents>
          <AddInput placeholder="종" ref={speciesRef} />
          <AddInput placeholder="품종" ref={breedRef} />
        </Contents>
        <AddInput placeholder="나이" ref={ageRef} />
        <AddInput placeholder="무게" ref={weightRef} />
        <Contents>
          <Item>
            <RadioText>성별</RadioText>
          </Item>
          <RadioContainer>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="F"
                checked={select === "F"}
                onChange={(event) => handleSelectChange(event)}
              />
              <RadioButtonLabel />
              <RadioText>F</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="M"
                checked={select === "M"}
                onChange={(event) => handleSelectChange(event)}
              />
              <RadioButtonLabel />
              <RadioText>M</RadioText>
            </Item>
          </RadioContainer>
        </Contents>
        <Contents>
          <Item>
            <RadioText>중성화</RadioText>
          </Item>
          <RadioContainer>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="완료"
                checked={select === "완료"}
                onChange={(event) => handleSelectChange(event)}
              />
              <RadioButtonLabel />
              <RadioText>완료</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="미완료"
                checked={select === "미완료"}
                onChange={(event) => handleSelectChange(event)}
              />
              <RadioButtonLabel />
              <RadioText>미완료</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="모름"
                checked={select === "모름"}
                onChange={(event) => handleSelectChange(event)}
              />
              <RadioButtonLabel />
              <RadioText>모름</RadioText>
            </Item>
          </RadioContainer>
        </Contents>
        <AddTextarea
          placeholder="진료내역(기억나는 것만 작성해주세요)"
          ref={medicalHistoryRef}
        />
        <AddTextarea
          placeholder="접종내역(기억나는 것만 작성해주세요)"
          ref={vaccinationRef}
        />
      </InfoContainer>
      <button onClick={onSubmit}>저장</button>
    </Container>
  );
}

export default AddPet;
