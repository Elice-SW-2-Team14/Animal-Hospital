import React, { useState } from "react";
import HpCard from "./HpCard";
import UserCard from "./UserCard";
import { ListContainer, Button } from "./style";

function AdminList() {
  const [check, setCheck] = useState<boolean>(false);
  const onClick = () => {
    console.log("click");
  };
  return (
    <ListContainer>
      <div>
        <Button onClick={onClick}>회원</Button>
        <Button onClick={onClick}>병원</Button>
      </div>
      <HpCard />
      <UserCard />
    </ListContainer>
  );
}

export default AdminList;
