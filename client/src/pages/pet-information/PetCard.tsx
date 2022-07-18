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
} from "./PetInfoStyle";
const token = localStorage.getItem("token");
function PetCard({ pet, onhandleDelete }: any) {
  const [petInfo, setPetInfo] = useState<PetInfoType>(pet);
  const [select, setSelect] = useState("F");
  // 서버 통신

  // const onhandleDelete = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   axios
  //     .delete("http://localhost:5100/pet/delete", {
  //       data: { petId: pet._id },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };
  const onChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const data = {
      ...pet,
      petId: pet._id,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    console.log(data);
    setPetInfo(data);
  };

  const onhandleUpdate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:5100/pet/update`, petInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // reload();
      });
  };

  // radio 관련
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelect(value);
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
          <PetImg src="https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516345?k=20&m=1213516345&s=612x612&w=0&h=_XUSwcrXe5HjI2QEby0ex6Tl1fB_YJUzUU8o2cUt0YA=" />
        </ImgContainer>
        <InfoContainer>
          <NameInput value={petInfo.name} name="name" onChange={onChange} />
          <Contents>
            <InfoInput
              value={petInfo.species}
              name="species"
              onChange={onChange}
            />
            <InfoInput value={petInfo.breed} name="breed" onChange={onChange} />
          </Contents>
          <InfoInput value={petInfo.age} name="age" onChange={onChange} />
          <InfoInput value={petInfo.weight} name="weight" onChange={onChange} />
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
          <InfoTextarea
            onChange={onChange}
            name="medicalHistorys"
            value={petInfo.medicalHistory}
          />
          <InfoTextarea
            onChange={onChange}
            name="vaccination"
            value={petInfo.vaccination}
          />
          <button onClick={onhandleUpdate}>
            {" "}
            <i className="fa-solid fa-paw"></i>저장
          </button>
          {/* <Btn>
            <i className="fa-solid fa-paw"></i>
          </Btn> */}
        </InfoContainer>
      </Contents>
    </PetCardContainer>
  );
}

export default PetCard;
