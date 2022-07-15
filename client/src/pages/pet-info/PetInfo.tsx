import React, {useState, useRef} from "react";
import "antd/dist/antd.min.css";
import { Button, Form, Typography } from "antd";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import { theme } from '../../styles/Colors';

const { Title } = Typography;

type PetCard = {
  // image: string,
  name: string,
  age: number,
  sex: string,
  weight: number,
  species: string,
  breed: string,
  medicalHistory: string,
  vaccination: string,
  neutralized: string
}

// 임시 데이터 (api 추가 후 삭제 예정)
const jsonData = {
  "name": '두식이',
  "age": 3,
  image: 'https://cdn.imweb.me/upload/S201712205a3a0910b89f5/d95b7faed6d64.jpg',
  "sex": 'F',
  "weight": 10.0,
  "species": '',
  "breed": '',
  "medicalHistory": '없음',
  "vaccination": '모름',
  "neutralized": '',
}

PetCard.defaultProps = {
  name: '',
  age: 0,
  image: '',
  sex: '',
  weight: 0.0,
  species: '',
  breed: '',
  medicalHistory: '',
  vaccination: '',
  neutralized: '',
}

export default function PetCard({
  name, age, weight, species, breed, vaccination, medicalHistory, neutralized
}: PetCard) {

  /* states */
  const [petList, setPetList] = useState([
    {pets: "두식이"}
  ]);
  const [index, setIndex] = useState<number>(1);

  // const [name, setName] = useState(jsonData.name);
  // const [age, setAge] = useState(jsonData.age);
  const [image, setImage] = useState('');
  // const [sex, setSex] = useState(jsonData.age);
  // const [weight, setWeight] = useState(jsonData.age);
  // const [species, setSpecies] = useState(jsonData.age);
  // const [breed, setBreed] = useState(jsonData.age);
  
  const selectDivHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('반려동물 선택 클릭, idx:', index);
    // setIndex(idx);
  };

  /* image converter */
  const convertFileToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve: any) => {
      if (reader) {
        reader.onload = () => {
        setImage(reader.result as string);
        resolve();
        };
      }
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("제출 클릭");
  }

  const addButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("추가 버튼 클릭");
    setPetList([...petList, {pets: ""}]);
  };

  const deleteButtonHandler = (event: React.MouseEvent<Element, MouseEvent>, idx: number) => {
    // type err sol.: https://stackoverflow.com/questions/60471034/type-mouseeventelement-mouseevent-is-not-assignable-to-type-mouseeventhtm
    console.log("삭제 버튼 클릭");
    const list = [...petList];
    list.splice(idx, 1);
    setPetList(list);
  };

  return (<div>
    <Grid item xs={12}>
      <Title className="item">펫 정보</Title>
    </Grid>
    <SubTitle>반려동물 목록</SubTitle>
    <Grid container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {/* 펫 DB에서 item들을 순회하여 버튼 생성 예정 */}
      {petList.map((pet, index) => (
        <Grid item key={index}>
        <div 
          key={index}
          onMouseEnter={selectDivHandler}
          style={{
            width: "150px",
            height: "150px",
            borderStyle: "solid",
            borderColor: `${theme.palette.orange}`,
            borderWidth: "7px",
            borderRadius: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "200px",
            backgroundPosition: "center",
            cursor: "pointer"
          }}
        />
      </Grid>
      ))}

      <Grid item>
        <Button
          name="addButton"
          onClick={addButtonHandler}
          style={{
            width: "100px",
            height: "100px",
            borderStyle: "solid",
            borderColor: `${theme.palette.blue}`,
            borderWidth: "7px",
            borderRadius: "100%",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >추가하기
        </Button>
      </Grid>
    </Grid>
    <Grid item xs={12}
      style={{
        display: "grid",
        justifyContent: 'center',
      }}
    >
      <Form
        // onSubmit={onsubmit}
        // ref={formRef}
        className="item"
        style={{
          display: "grid",
          justifyContent: 'center',
          alignItems: 'center',
          borderStyle: "solid",
          borderColor: `${theme.palette.orange}`,
          borderWidth: "10px",
          borderRadius: "5%",
          margin: "0 0 2rem 2rem",
          padding: "1rem 2rem 1rem 2rem",
          maxWidth: "480px"
        }}
      >
        <div style={{ marginBottom: "1rem" }} />
        <div>
          <SubTitle>이름</SubTitle>
          <input
            style={{
              marginBottom: "1rem",
              marginLeft: "0.5rem"
            }}
            type="text"
            value={name}
            disabled
          />
        </div>
        <div>
          <SubTitle>나이</SubTitle>
          <input
            style={{
              marginBottom: "1rem",
              marginLeft: "0.5rem"
            }}
            type="text"
            value={age}
            disabled
          />
        </div>
        <div>
          <SubTitle>성별</SubTitle>
          <label><input
            style={{
              marginLeft: "0.5rem"
            }}
            type="radio"
            name="gender"
            value="F"
          />F</label>
          <label><input
            style={{
              marginLeft: "0.5rem"
            }}
            type="radio"
            name="gender"
            value="M"
          />M</label>
          <div style={{ marginBottom: "1rem" }} />
        </div>
        <div>
          <SubTitle>사진</SubTitle>
          <div style={{ marginBottom: "0.5rem" }} />
          <div style={{ marginBottom: "0.5rem" }}>
            <UploadFileLabel htmlFor="uploadFile">업로드</UploadFileLabel>
            <UploadFileInput type="file"
              id="uploadFile"
              accept='image/jpg,image/png,image/jpeg,image/gif'
              name='profile_img'
              onChange={(e: any) => {
                convertFileToBase64(e.target.files[0]);
                console.log(e.target.files);
                setImage(e.target.files);
              }}
            />
          </div>
          <div>
            <img
              src={image}
              width="280px"
              alt=""
            />
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }} />
        <div>
          <SubTitle>무게</SubTitle>
          <input
            style={{
              marginBottom: "1rem",
              marginLeft: "0.5rem"
            }}
            type="text"
            value={weight}
            disabled
          /> (kg)
        </div>
        <div>
          <SubTitle>종</SubTitle>
          <select
            style={{
              marginBottom: "1rem",
              marginLeft: "0.5rem"
            }}
            name="animal"
            id="animal"
            disabled
          >
            <option value="">선택</option>
            <option value="개">개</option>
            <option value="고양이">고양이</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div>
          <SubTitle>병력</SubTitle>
          <input
            style={{
              marginBottom: "0.5rem",
              marginLeft: "0.5rem"
            }}
            type="text"
            value={medicalHistory}
            disabled
          />
        </div>
        <div>
          <SubTitle>접종이력</SubTitle>
          <input
            style={{
              marginBottom: "0.5rem",
              marginLeft: "0.5rem"
            }}
            type="text"
            value={vaccination}
            disabled
          />
        </div>
        <div>
          <SubTitle>중성화 수술 여부</SubTitle>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="tcr"
              value="완료"
            />완료
          </label>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="tcr"
              value="미완료"
            />미완료
          </label>
          <label>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="radio"
              name="tcr"
              value="모름"
            />모름
          </label>
        </div>
        <div>
          <Button
            style={{ marginTop: "1rem" }}
            onSubmit={onSubmit}
          >수정
          </Button>
          {petList.length > 1 && (
            <Button
              style={{
                marginTop: "1rem",
                marginLeft: "1rem"
              }}
              onClick={(e) => deleteButtonHandler(e, index)}
            >삭제
           </Button>
          )}
        </div>
      </Form>
    </Grid>
  </div>);
}

const SubTitle = styled.span`
  font-size: 16px;
`

/* 사진 추가 css */

const UploadFileLabel = styled.label`
  display: inline-block;
  padding: .5em .8em;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid ${theme.palette.lightgray};
  border-radius: .25em;

  :hover {
    transition: 2ms ease-in;
    border-color: ${theme.palette.blue};
    color: ${theme.palette.blue};
  }
`
const UploadFileInput = styled.input`
  position: absolute;
  padding: 0;
  margin: -1px;
  clip:rect(0,0,0,0);
  border: 0;
`