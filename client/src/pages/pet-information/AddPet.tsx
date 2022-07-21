import React, { useState, useRef, useEffect } from "react";
import ImgUploader from "../../components/ImgUploader";
import {
  Title,
  ImgContainer,
  InfoContainer,
  RadioButton,
  RadioButtonLabel,
  RadioContainer,
  RadioText,
  Item,
  Contents,
  Container,
  AddInput,
  AddTextarea,
  Button,
} from "./PetInfoStyle";
import { PetInfoType } from "./PetInfoInterface";

const token = localStorage.getItem("token");
function AddPet({ onAdd }: any) {
  const [gender, setGender] = useState<string>();
  const [neut, setNeut] = useState<string>();
  const [img, setImg] = useState();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const medicalHistoryRef = useRef<HTMLTextAreaElement>(null);
  const vaccinationRef = useRef<HTMLTextAreaElement>(null);

  const onhandleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);

    setGender(value);
  };
  const onhandleNeut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    setNeut(value);
  };
  const updateImg = ({ newImgs }: any) => {
    setImg(newImgs);
    // console.log(img);
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      weight: weightRef.current?.value,
      species: speciesRef.current?.value,
      breed: breedRef.current?.value,
      medicalHistory: medicalHistoryRef.current?.value,
      vaccination: vaccinationRef.current?.value,
      sex: gender,
      neutralized: neut,
    };
    onAdd(data);
  };

  return (
    <Container ref={formRef}>
      <Title>펫 정보를 입력해주세요 🐾</Title>
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
                checked={gender === "F"}
                onChange={onhandleGender}
              />
              <RadioButtonLabel />
              <RadioText>F</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="M"
                checked={gender === "M"}
                onChange={onhandleGender}
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
                name="neutralized"
                value="완료"
                checked={neut === "완료"}
                onChange={onhandleNeut}
              />
              <RadioButtonLabel />
              <RadioText>완료</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="neutralized"
                value="미완료"
                checked={neut === "미완료"}
                onChange={onhandleNeut}
              />
              <RadioButtonLabel />
              <RadioText>미완료</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="neutralized"
                value="모름"
                checked={neut === "모름"}
                onChange={onhandleNeut}
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
      <Button onClick={onSubmit}>추가</Button>
    </Container>
  );
}

export default AddPet;
