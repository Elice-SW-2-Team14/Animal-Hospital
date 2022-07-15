import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

// 검색창 전체
const SearchContainer = styled.div`
  position: relative;
`;

// 검색창
const SearchInput = styled.input`
  box-sizing: border-box;
  border: 2px solid ${props => props.theme.palette.orange};
  border-radius: 10px;
  padding: 8px 12px;
  width: 300px;
  transition: box-shadow 0.2s ease-in-out;
  &:focus {
    outline: none;
    box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.16);
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.16);
  }
`;

// 검색 돋보기
const SearchIcon = styled(FontAwesomeIcon) `
  color: ${props => props.theme.palette.orange};
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 10px;
`;

// 자동완성 컨테이너
const AutoSearchContainer = styled.div`
  z-index: 3;
  height: auto;
  width: 300px;
  background-color: white;
  position: absolute;
  top: 38px;
  border: 1px solid ${props => props.theme.palette.gray};
  border-radius: 6px;
  padding: 4px;
`;

// 자동완성 데이터 래퍼
const AutoSearchWrap = styled.div`

`;

// 자동완성 데이터들
const AutoSearchData = styled(Link)`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  color: black;
  display: block;
  &:hover {
    background-color: #ffe9bf;
    cursor: pointer;
    color: black;
  }
  position: relative;
`

export default function Search() {
  const [search, setSearch] = useState<string>(''); // 검색 내용
  const [keyItems, setKeyItems] = useState<string[]>([]); // 필터링 된 배열
  
  function updateData() {
    // 가데이터
    const data = ['무료검진', '전문의', '야간진료', '가성비', '중성화 수술 전문', '강아지', '독수리', '고양이', '조류', '생선류', '간식판매', '호텔', '미용', '역세권', '성수동', '광진구', '엘리베이터', '프리미엄', '예약방문', '다리수술', '발톱깎기', '충치', '감기', '약', '이구아나', '가축', '사료', 'mri'];
  
    const filtered: string[] = data.filter((key:string) => key.includes(search)); // 검색한 단어가 data에 포함되는지 여부 판단
    setKeyItems([...filtered]); // 포함하는 데이터만 keyItems에 넣기
  }

  // 성능 향상을 위한 디바운싱. 200ms동안 동작 없으면 그 데이터에서 필터결과 보여줌
  useEffect(() => {
    const debounce = setTimeout(() => {
      search && updateData();
    }, 200)
    return () => {
      clearTimeout(debounce);
    }
  }, [search])

  return (
    <>
      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='검색'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon icon={faMagnifyingGlass} size='2x' />
        {keyItems.length !== 0 &&
          <AutoSearchContainer>
            <AutoSearchWrap>
              {keyItems.map((item: string) => {
                return <AutoSearchData to='/login'>{item}</AutoSearchData>
              })}
            </AutoSearchWrap>
          </AutoSearchContainer>
        }
      </SearchContainer>
    </>
  )
}
