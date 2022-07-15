import styled from 'styled-components';

const MainCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 80px 0 80px;
`;

const MainCardContainer = styled.div`
  width: 300px;
  height: 385px;
  margin: 24px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const MainCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding: 0 10px 0 10px;
`;

const MainCardName = styled.div`
  font-weight: 700;
`;

const MainCardAdress = styled.div`
  margin-top: 8px;
  color: rgb(113, 113, 113);
`;

const MainCardImg = styled.img`
  border-radius: 16px;
`;

export {
  MainCardContainer,
  MainCardWrapper,
  MainCardContent,
  MainCardName,
  MainCardAdress,
  MainCardImg,
};
