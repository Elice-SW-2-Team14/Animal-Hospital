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
  RadioButton,
  RadioButtonLabel,
  RadioContainer,
  RadioText,
  Item,
  PetImg,
  Contents,
  Button,
} from "./PetInfoStyle";

const defaultImg =
  "https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516345?k=20&m=1213516345&s=612x612&w=0&h=_XUSwcrXe5HjI2QEby0ex6Tl1fB_YJUzUU8o2cUt0YA=";
const token = localStorage.getItem("token");

function PetCard({ pet, onhandleDelete }: any) {
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
  // 받아온 값 pet을 petinfo에 넣어줌
  console.log(pet);

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
    const data = { ...petInfo, petId: pet._id };
    try {
      axios.patch(`http://localhost:5100/pet/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("수정완료! 🐾");
    } catch (err) {
      alert("입력값을 다시 한 번 확인해주세요 🥲");
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

  console.log(gender, neut);

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
          <PetImg src={petInfo.image} />
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
                  name="gender"
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
                  name="gender"
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
                  name="neutralized"
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
                  name="neutralized"
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
                  name="neutralized"
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
          <Button>
            <i className="fa-solid fa-camera"></i>
            사진
          </Button>
          <Button onClick={onhandleUpdate}>
            <i className="fa-solid fa-paw"></i>저장
          </Button>
        </InfoContainer>
      </Contents>
    </PetCardContainer>
  );
}

export default PetCard;
