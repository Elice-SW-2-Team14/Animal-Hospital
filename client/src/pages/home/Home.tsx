import React from 'react';
import styled from 'styled-components';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`


export default function home() {
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Header />
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </>
  )
}
