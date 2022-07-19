import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import { MainContainer, AddBtn } from "./PetInfoStyle";
import AddPet from "./AddPet";
import { PetInfoType } from "./PetInfoInterface";

const token = localStorage.getItem("token");
function PetInformation() {
  const [pets, setPets] = useState<PetInfoType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // 처음 한 번 서버 통신
  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    console.log("11111");

    const res = await axios.get("http://localhost:5100/pet/mypets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    setPets(data);
    console.log(data);
  };

  const onhandleDelete = async (id: string) => {
    await axios.delete("http://localhost:5100/pet/delete", {
      data: { petId: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const newPets = [...pets];
    // const newArr = newPets.filter((pet) => pet._id !== id);
    // setPets(newArr);
    console.log("로드전", pets);
    reload();
    console.log("로드 후", pets);
  };

  return (
    <MainContainer>
      <h1>pet info</h1>
      <AddBtn onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-plus fa-xl"></i>
      </AddBtn>
      {isOpen && <AddPet />}
      썸넬이 필요함
      {pets.map((pet, i) => (
        <PetCard pet={pet} key={i} onhandleDelete={onhandleDelete} />
      ))}
    </MainContainer>
  );
}

export default PetInformation;
