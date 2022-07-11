import React from "react";
import styled from "styled-components";

const Line = styled.div`
  margin: 20px 0;
  border-bottom: solid 1px black;
`

export default function Title({title}: any) {
  return (
    <>
      <h2>{title}</h2>
      <Line />
    </>
  )
}