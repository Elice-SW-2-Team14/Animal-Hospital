import styled from "styled-components";
export const MainContainer = styled.div`
  max-width: 800px;
  margin: 1rem auto;
`;

export const Title = styled.p`
  text-align: center;
  font-weight: 500;
`;

export const AddBtn = styled.button`
  border: none;
  border-radius: 50%;
  padding: 0.3rem 0.5rem;
  color: ${(props) => props.theme.palette.orange};
  background-color: ${(props) => props.theme.palette.lightgray};
  &:hover {
    background-color: ${(props) => props.theme.palette.orange};
    color: ${(props) => props.theme.palette.lightgray};
  }
`;
export const Button = styled.button`
  border: none;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.palette.orange};
  color: white;
  font-weight: bold;
  &:hover {
    transform: scale(1.05);
  }
`;
export const PetCardContainer = styled.div`
  padding: 1rem;
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
`;
export const DeleteBtn = styled.button`
  border: none;
  background: none;
  display: flex;
  margin-left: auto;
  color: ${(props) => props.theme.palette.orange};
  &:hover {
    color: ${(props) => props.theme.palette.lightgray};
  }
`;
export const Contents = styled.div`
  display: flex;
`;
export const ImgContainer = styled.div`
  display: flex;
  padding: 2rem;
  cursor: pointer;
`;
export const PetImg = styled.img`
  max-width: 400px;
  max-height: 300px;
  border-radius: 15px;
`;

export const InfoContainer = styled.div`
  padding: 0 1rem;
`;
export const InfoInput = styled.input`
  border: none;
  padding: 0.5rem;
  margin: 0.1rem;
  outline: none;
`;
export const InfoTextarea = styled.textarea`
  width: 100%;
  border: none;
  padding: 0.5rem;
  margin: 0.1rem;
  outline: none;
`;
export const NameInput = styled(InfoInput)`
  font-size: 1.2rem;
  font-weight: 500;
  display: block;
`;
export const RadioContainer = styled.div`
  display: flex;
`;
export const Item = styled.div`
  display: flex;
  margin-left: 0.2rem;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`;
export const RadioButtonLabel = styled.label`
  position: absolute;
  top: 21%;
  left: 10px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.lightgray};
`;
export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  &:hover ~ ${RadioButtonLabel} {
    background-color: ${(props) => props.theme.palette.orange};
    opacity: 0.5;
  }
  &:checked + ${RadioButtonLabel} {
    border: none;
    background-color: ${(props) => props.theme.palette.orange};
  }
`;
export const RadioText = styled.p`
  font-size: 0.9rem;
  margin-left: 0.4rem;
`;

////////
export const Container = styled.form`
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  /* border: 2px solid ${(props) => props.theme.palette.lightgray}; */
`;
export const AddInput = styled(InfoInput)`
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.lightgray};
`;
export const AddTextarea = styled(InfoTextarea)`
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.lightgray};
`;
