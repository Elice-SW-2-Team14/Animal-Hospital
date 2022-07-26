import React from "react";
import { Container, InfoInput, InputLabel } from "../InfoForm";

type TBookProps = {
  label: string;
  defaultValue: string;
  name: string;
};

const ReservationContent = ({ label, defaultValue, name }: TBookProps) => {
  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <InfoInput defaultValue={defaultValue} disabled />
    </Container>
  );
};

export default ReservationContent;
