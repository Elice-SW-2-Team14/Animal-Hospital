import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { InfoText, ListContainer, Header } from "../../components/Liststyle";
import { UserInfoType } from "../user-info/Interface";
import SearchBar from "./SearchBar";
import styled from "styled-components";
const Container = styled(ListContainer)`
  max-width: 700px;
  margin: 0rem auto;
  padding: 1rem;
`;
const Btn = styled.button`
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  margin-left: 0.2rem;
  background-color: ${(props) => props.theme.palette.orange};
  color: white;
  font-weight: bold;
`;

function AdminUserList() {
  const token = localStorage.getItem("token");
  const [datas, setDatas] = useState<UserInfoType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const [sort, serSort] = useState<string>();

  useEffect(() => {
    axios
      .get("http://kdt-sw2-seoul-team14.elicecoding.com:5000/api/userlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDatas(res.data);
      });
  }, []);

  const SearchLists = search
    ? datas.filter((data: any) =>
        data.email.includes(`${search}`.toLocaleLowerCase())
      )
    : datas;

  const onhandleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    serSort(event.currentTarget.name);
    setIsOpen(false);
  };
  const ex = sort ? datas.filter((data) => data.userStatus === sort) : datas;

  return (
    <Container>
      <div>
        <Btn name="normal" onClick={onhandleSort}>
          회원
        </Btn>
        <Btn name="expired" onClick={onhandleSort}>
          탈퇴회원
        </Btn>
        <Btn
          name="check"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          검색
        </Btn>
      </div>
      {isOpen && (
        <SearchBar
          datas={datas}
          setSearch={(search: string) => setSearch(search)}
        />
      )}

      <Header>
        <InfoText>역할</InfoText>
        <InfoText>이름</InfoText>
        <InfoText>아이디</InfoText>
        <InfoText>상태</InfoText>
      </Header>
      {isOpen
        ? SearchLists.map((data: any, i: number) => (
            <UserCard key={i} data={data} />
          ))
        : ex
            .splice(0, 5)
            .map((data: any, i: number) => <UserCard key={i} data={data} />)}
    </Container>
  );
}

export default AdminUserList;
