import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import { MainContainer, AddBtn } from "./PetInfoStyle";
import AddPet from "./AddPet";
import { PetInfoType } from "./PetInfoInterface";

function PetInformation() {
  const token = localStorage.getItem("token");
  const [pets, setPets] = useState<PetInfoType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 처음 한 번 서버 통신
  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    const res = await axios.get(
      "http://kdt-sw2-seoul-team14.elicecoding.com:5000/pet/mypets",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    setPets(data);
  };

  const onhandleDelete = async (id: string) => {
    await axios.delete(
      "http://kdt-sw2-seoul-team14.elicecoding.com:5000/pet/delete",
      {
        data: { petId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await reload();
  };

  const onhandleAdd = async (data: any) => {
    try {
      await axios.post(
        "http://kdt-sw2-seoul-team14.elicecoding.com:5000/pet/register",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainContainer>
      <h1>내 펫 정보 확인</h1>
      <AddBtn onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-plus fa-xl"></i>
      </AddBtn>
      {isOpen && (
        <AddPet
          onhandleAdd={(data: any) => {
            onhandleAdd(data);
          }}
        />
      )}
      {pets.map((pet, i) => (
        <PetCard pet={pet} idx={i} key={i} onhandleDelete={onhandleDelete} />
      ))}
    </MainContainer>
  );
}

export default PetInformation;
