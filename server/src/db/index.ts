import mongoose from 'mongoose';

const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () =>
  console.log('####### 정상적으로 MongoDB 서버에 연결되었습니다.#######')
);
db.on('error', (error) =>
  console.error('\nMongoDB 연결에 실패하였습니다...\n' + '\n' + error)
);

export * from './models/UserModel';
export * from './models/PetModel';
export * from './models/ReviewModel';
export * from './models/HospStatusModel';
export * from './models/HospRegStatusModel';
export * from './models/HospTagModel';
export * from './models/HospModel';
export * from './models/HospServiceModel';
export * from './models/RezStatusModel';
export * from './models/RezModel';
