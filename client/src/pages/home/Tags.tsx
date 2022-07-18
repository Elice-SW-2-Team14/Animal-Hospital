import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {Link, useSearchParams} from 'react-router-dom';
import axios from 'axios';

// import overnight from '../../';

const TagImg = styled.img`
  width: 40px;
  transition: 0.2s all ease-in-out;
`;
interface ITagValue {
  tag: number;
  idx: number;
}

const TagWrapper = styled.div<ITagValue>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.idx === props.tag ? 'black' : props.theme.palette.gray};
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.idx === props.tag ? 'black' : 'white'};
  ${TagImg} {
    filter: contrast(${props => props.idx === props.tag ? 1 : 0.1});
  }

  &:hover {
    color: black;
    border-bottom: 3px solid ${props => props.theme.palette.gray};
    ${TagImg} {
      filter: contrast(1);
    }
  }

  &:focus {
    border-bottom: 3px solid black;
  }
`;

const TagName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;

interface ITagData {
  _id: string
  name: string,
  image: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export default function Tags() {

  const [tagData, setTagData] = useState<ITagData[]>([]); // 태그 데이터 모음
  const [tag, setTag] = useState<number>(0); // 클릭 된 태그의 인덱스
  const [searchParams, setSearchParams] = useSearchParams();
  const [paramsTag, setParamsTag] = useState<string | null>('');
  

  useEffect(() => {
    async function getData() {
      const res = await axios.get('http://localhost:5100/hospitalTag/list', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setTagData([...res.data]);
    }
    getData();
  }, []);

  useEffect(() => {
    setParamsTag(searchParams.get('tagName'));
  }, [searchParams])

  function handleTagClick(category: ITagData ,idx: number) {
    setTag(idx);
    setSearchParams({page: '1', perPage: '4', tagName: category.name});
  }

  return (
    <>
        {tagData.map((category: ITagData, idx:number) => {
          return (
            <TagWrapper
              key={category._id}
              idx={idx}
              onClick={() => handleTagClick(category, idx)}
              tag={tag}
            >
              <TagImg src={category.image} />
              <TagName>{category.name}</TagName>
            </TagWrapper>
          )
        })}
    </>
  )
}
