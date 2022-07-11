import styled from "styled-components";

export const Title = styled.h1`
  width: 100%;
  padding-bottom: 10px;
  font-size: 2em;
  font-weight: Bolder;
`;
export const Form = styled.form`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
`;
export const MainContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
`;
export const Container = styled.div`
  border-bottom: 1px solid #ebebeb;
  margin: 1rem 0rem;
  padding: 1rem 0rem;
`;
export const InputLabel = styled.p`
  font-size: 15px;
`;
export const InfoInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #a0a0a0;
`;
export const InfoBtn = styled.button`
  /* background-color: ${(props) => props.theme.palette.orange}; */
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.6rem;
  &:hover {
    opacity: 0.8;
  }
`;
export const Divider = styled.div`
  margin-top: 1rem;
`;
export const DeactivateContainer = styled.div`
  margin: 4rem;
  padding: 1rem;
  text-align: center;
  font-size: 13px;
`;
export const DeactiveBtn = styled.button`
  margin-top: 1rem;
  background: none;
  border: none;
  font-weight: 500;
  font-size: 12px;
  border-bottom: 1.1px solid;
  padding: 0.2rem 0.4rem 0 0.4rem;
  &:hover {
    opacity: 0.8;
  }
`;
