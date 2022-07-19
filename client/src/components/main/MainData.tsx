// 추후 API가 만들어질시에는 삭제할 파일입니다! ../../../public/tags/bird.png
type DataProps = {
  hospitalName: string;
  address: string;
  imageUrl: string;
  keyWord: string[];
  price?: number;
};

const sampleData: DataProps[] = [
  {
    hospitalName: '안녕 강아지 병원',
    address: '서울시 은평구 행복동',
    imageUrl: '/sample.jpg',
    keyWord: ['24시', '강아지전문', '야간진료'],
    price: 3000,
  },
  {
    hospitalName: '안녕 고양이 병원',
    address: '서울시 은평구 행복동',
    imageUrl: '/sample.jpg',
    keyWord: ['24시', ' 고양이전문', '연중무휴'],
    price: 3000,
  },
  {
    hospitalName: '안녕 얼룩말 병원',
    address: '서울시 은평구 행복동',
    imageUrl: '/sample.jpg',
    keyWord: ['24시', '얼룩말전문', '아침진료'],
    price: 3000,
  },
  {
    hospitalName: '안녕 염소 병원',
    address: '서울시 은평구 행복동',
    imageUrl: '/sample.jpg',
    keyWord: ['24시', ' 염소전문', '연중무휴'],
    price: 3000,
  },
  {
    hospitalName: '안녕 호랭이 병원',
    address: '서울시 은평구 행복동',
    imageUrl: '/sample.jpg',
    keyWord: ['24시', '호랑이전문', '야간진료'],
    price: 3000,
  },
  {
    hospitalName: '안녕 사자 병원',
    address: '서울시 은평구 행복동',
    imageUrl: '/sample.jpg',
    keyWord: ['24시', ' 사자전문', '연중무휴'],
    price: 3000,
  },
  {
    hospitalName: '안녕 이구아나 병원',
    address: '서울시 은평구 행복동',
    imageUrl: '/sample.jpg',
    keyWord: ['24시', '이구아나전문', '야간진료'],
    price: 3000,
  },
];

export { sampleData };
