import React, { useEffect, useState } from "react";
import axios from "axios";
import { PetInfoType } from "./PetInfoInterface";
import {
  PetCardContainer,
  DeleteBtn,
  ImgContainer,
  InfoContainer,
  InfoInput,
  InfoTextarea,
  NameInput,
  AddInput,
  RadioButton,
  RadioButtonLabel,
  RadioContainer,
  RadioText,
  Item,
  PetImg,
  Contents,
  Button,
} from "./PetInfoStyle";

const defaultImg = "/defaultImg.png";
const token = localStorage.getItem("token");

function PetCard({ pet, idx, onhandleDelete }: any) {
  const [petInfo, setPetInfo] = useState<PetInfoType>({
    _id: "",
    image: "",
    owner: "",
    species: "",
    breed: "",
    name: "",
    age: 0,
    sex: "",
    weight: 0,
    medicalHistory: "",
    vaccination: "",
    neutralized: "",
  });
  const [gender, setGender] = useState(pet.sex);
  const [neut, setNeut] = useState(pet.neutralized);

  useEffect(() => {
    setPetInfo(pet);
  }, [pet]);

  const onInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const data = {
      ...petInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    setPetInfo(data);
  };

  const onhandleUpdate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = { ...petInfo, petId: pet._id, sex: gender, neutralized: neut };
    try {
      axios.patch(
        `http://kdt-sw2-seoul-team14.elicecoding.com:5000/pet/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      // alert("입력값을 다시 한 번 확인해주세요 🥲");
    }
  };

  // radio 관련
  const onhandleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGender(value);
  };
  const onhandleNeut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNeut(value);
  };

  return (
    <PetCardContainer>
      <DeleteBtn
        onClick={() => {
          onhandleDelete(pet._id);
        }}
      >
        <i className="fa-solid fa-circle-minus fa-xl"></i>
      </DeleteBtn>
      <Contents>
        <ImgContainer>
          <PetImg src={petInfo.image || defaultImg} />
        </ImgContainer>
        <InfoContainer>
          <NameInput
            name="name"
            onChange={onInputChange}
            value={petInfo.name}
          />
          <Contents>
            <InfoInput
              name="species"
              onChange={onInputChange}
              value={petInfo.species}
            />
            <InfoInput
              name="breed"
              onChange={onInputChange}
              value={petInfo.breed}
            />
          </Contents>
          <InfoInput
            name="age"
            type="number"
            value={petInfo.age}
            onChange={onInputChange}
          />
          <InfoInput
            name="weight"
            type="number"
            onChange={onInputChange}
            value={petInfo.weight}
          />
          <Contents>
            <Item>
              <RadioText>성별</RadioText>
            </Item>
            <RadioContainer>
              <Item>
                <RadioButton
                  type="radio"
                  name={`${idx}gender`}
                  value="F"
                  checked={gender === "F"}
                  onChange={(event) => onhandleGender(event)}
                />
                <RadioButtonLabel />
                <RadioText>F</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name={`${idx}gender`}
                  value="M"
                  checked={gender === "M"}
                  onChange={(event) => onhandleGender(event)}
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
                  name={`${idx}neutralized`}
                  value="완료"
                  checked={neut === "완료"}
                  onChange={(event) => onhandleNeut(event)}
                />
                <RadioButtonLabel />
                <RadioText>완료</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name={`${idx}neutralized`}
                  value="미완료"
                  checked={neut === "미완료"}
                  onChange={(event) => onhandleNeut(event)}
                />
                <RadioButtonLabel />
                <RadioText>미완료</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name={`${idx}neutralized`}
                  value="모름"
                  checked={neut === "모름"}
                  onChange={(event) => onhandleNeut(event)}
                />
                <RadioButtonLabel />
                <RadioText>모름</RadioText>
              </Item>
            </RadioContainer>
          </Contents>
          <InfoTextarea
            name="medicalHistory"
            onChange={onInputChange}
            value={petInfo.medicalHistory}
          />
          <InfoTextarea
            name="vaccination"
            onChange={onInputChange}
            value={petInfo.vaccination}
          />
          <Button onClick={onhandleUpdate}>
            <i className="fa-solid fa-paw"></i>저장
          </Button>
        </InfoContainer>
      </Contents>
    </PetCardContainer>
  );
}

export default PetCard;
