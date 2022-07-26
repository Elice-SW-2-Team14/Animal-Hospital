import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { errorLogger, errorHandler } from './middlewares';
import {
  userRouter,
  petRouter,
  reviewRouter,
  hospStatusRouter,
  hospRegStatusRouter,
  hospTagRouter,
  hospitalRouter,
  rezStatusRouter,
  reservationRouter,
} from './routers';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { passportLocalConfig } from './passport/LocalStrategy';
import { passportKakaoConfig } from './passport/KakaoStrategy';

const app = express();

// CORS 에러 방지
// app.use(cors({ credentials: true, origin: 'http://localhost:3030' }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'team14-animal-hospital',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportLocalConfig();
passportKakaoConfig();

app.use('/hospitalStatus', hospStatusRouter);
app.use('/hospitalRegStatus', hospRegStatusRouter);
app.use('/hospitalTag', hospTagRouter);
app.use('/hospital', hospitalRouter);
app.use('/api', userRouter);
app.use('/pet', petRouter);
app.use('/review', reviewRouter);

app.use('/reservationStatus', rezStatusRouter);
app.use('/reservation', reservationRouter);

// app.use('*', ) //errorHandler로 무조건 400처리하면 안됨

// 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
app.use(errorLogger);
app.use(errorHandler);

//라우팅

export { app };
