import React from 'react';
import { MainKeyWordContainer, MainKeyWordContent } from './MainKeyWordStyle';

type TKeyWord = {
  mainKeyWord: string[];
};

// keyword를 뿌려줄 컴포넌트
function MainKeyWord({ mainKeyWord }: TKeyWord) {
  const keyWordProps = mainKeyWord.map((keyWord) => (
    <MainKeyWordContent>{keyWord}</MainKeyWordContent>
  ));

  return <MainKeyWordContainer>{keyWordProps}</MainKeyWordContainer>;
}

export default MainKeyWord;
