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
    const res = await axios.get("http://localhost:5100/pet/mypets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    setPets(data);
  };

  const onhandleDelete = async (id: string) => {
    await axios.delete("http://localhost:5100/pet/delete", {
      data: { petId: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await reload();
    alert("삭제완료!");
  };

  // const onUpdate = async (data: any) => {
  //   try {
  //     await axios.post("http://localhost:5100/pet/register", data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     alert("펫 추가 완료 🐾");
  //   } catch (err) {
  //     console.log(err);
  //     alert("입력한 내용을 확인해주세요 🥲 ");
  //   }
  // };

  return (
    <MainContainer>
      <h1>pet info</h1>
      <AddBtn onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-plus fa-xl"></i>
      </AddBtn>
      {isOpen && <AddPet />}
      {pets.map((pet, i) => (
        <PetCard pet={pet} key={i} onhandleDelete={onhandleDelete} />
      ))}
    </MainContainer>
  );
}

export default PetInformation;
