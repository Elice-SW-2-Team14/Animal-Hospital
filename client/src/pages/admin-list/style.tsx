import styled from "styled-components";
export const ListContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.1rem;
  background-color: ${(props) => props.theme.palette.gray};
  color: white;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;
export const InfoCard = styled.div`
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
  padding: 0.5rem;
  margin-top: 1rem;
`;
export const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const InfoText = styled.div`
  display: block;
  flex: 0 0 25%;
  max-width: 25%;
`;
export const Title = styled(InfoText)`
  font-weight: 500;
`;

export const StatusContainer = styled(InfoText)`
  display: flex;
  justify-content: center;
  margin-left: auto;
`;

export const Select = styled.select`
  outline: none;
  background: white;
  margin: 0.1rem;
  padding: 0.2rem;
  border: none;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
