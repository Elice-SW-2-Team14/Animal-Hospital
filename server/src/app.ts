import cors from 'cors';
import express from 'express';
import { errorLogger, errorHandler } from './middlewares';
import {
  userRouter,
  petRouter,
  reviewRouter,
  hospStatusRouter,
  hospRegStatusRouter,
  hospTagRouter,
  hospitalRouter,
} from './routers';

const app = express();

// CORS 에러 방지

app.use(cors({ credentials: true, origin: 'http://localhost:3030' }));

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.

app.use(express.urlencoded({ extended: false }));

app.use('/hospitalStatus', hospStatusRouter);
app.use('/hospitalRegStatus', hospRegStatusRouter);
app.use('/hospitalTag', hospTagRouter);
app.use('/hospital', hospitalRouter);
app.use('/api', userRouter);
app.use('/pet', petRouter);
app.use('/review', reviewRouter);

// app.use('*', ) //errorHandler로 무조건 400처리하면 안됨

// 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
app.use(errorLogger);
app.use(errorHandler);

//라우팅

export { app };
