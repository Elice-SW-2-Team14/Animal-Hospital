import styled from "styled-components";

const MainKeyWordContainer = styled.div`
  display: flex;
  margin-top: 5px;
  border-radius: 14px;
`;

const MainKeyWordContent = styled.div`
  font-size: 14px;
  border-radius: 10px;
  margin-right: 5px;
  padding: 6px;
  color: white;
  font-weight: bold;
  background-color: ${(props) => props.theme.palette.orange};
`;

export { MainKeyWordContainer, MainKeyWordContent };
