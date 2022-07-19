import React   from 'react'

import styled from 'styled-components';

import Tags from './Tags';

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 90px;
`;

export default function TagList() {
  return (
    <>
      <TagContainer>
        <Tags />
      </TagContainer>
    </>
  );
}
