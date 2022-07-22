import { Router, Request, Response, NextFunction } from 'express';
import * as _ from 'lodash'; 

import { loginRequired, adminOnly, } from '../middlewares';
import { registerUserCTR, loginUserCTR, getUserInfoCTR, updateUserInfoCTR, getAllUsersCTR, ExpireUserCTR, loginKakaoCTR, loginPassportCTR, setUserStatusCTR } from '../controllers/UserController';
import passport from 'passport';
import { passportConfig } from '../passport';
import {passportKakaoConfig} from '../passport/KakaoStrategy';

const router = Router();

//회원가입
router.post('/register', registerUserCTR);

//로그인
// router.post('/login', loginUserCTR);
router.post('/login', loginPassportCTR);

router.get('/login/kakao', passport.authenticate('kakao'));
router.get('/oauth/kakao/callback',loginKakaoCTR);
// passportConfig();
passportKakaoConfig();

//일반회원 개인정보 조회
router.get('/user', loginRequired, getUserInfoCTR);

//일반회원 개인정보 수정
router.patch('/users/:userEmail', loginRequired, updateUserInfoCTR);

// 관리자의 일반 회원 전체 조회
router.get('/userlist', adminOnly, getAllUsersCTR);

// 관리자의 일반회원 상태 변경
router.patch('/admin/status', loginRequired, setUserStatusCTR);

// 일반 회원 탈퇴 
router.patch('/expiration', loginRequired, ExpireUserCTR)

export { router as userRouter };
