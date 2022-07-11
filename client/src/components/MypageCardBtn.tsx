import styled from "styled-components";

export const MypageHeader = styled.div`
  padding: 1rem;
`;
export const HeaderTitle = styled.h3`
  margin-bottom: 1rem;
`;
export const HeaderDescription = styled.p`
  color: gray;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  flex-wrap: wrap;
`;
export const Card = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  width: 31%;
  padding: 1rem;
  margin: 0.3rem;
  :hover {
    transform: scale(1.01);
  }
`;

export const CardTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
`;
export const CardDescription = styled.p`
  font-size: 13px;
  color: gray;
`;
