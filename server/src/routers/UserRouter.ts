import { Router, Request, Response, NextFunction } from 'express';
import * as _ from 'lodash'; //npm install --save @types/lodash

import { userService } from '../services';
import { UserAddress } from '../db';
import { loginRequired, checkStatus } from '../middlewares';
import { adminOnly } from '../middlewares';
const userRouter = Router();

//회원가입
userRouter.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //body가 빈 객체가 아닌지 확인
      if (_.isEmpty(req.body)) {
        throw new Error(
          "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
        );
      }

      //body의 회원등록 정보 가져오기
      const userName: string = req.body.userName;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const phoneNumber: string = req.body.phoneNumber;
      const address: UserAddress = req.body.address;
      const role: string = req.body.role;
      const userStatus: string = req.body.userStatus;

      // 필수정보 기입되었는지, 이메일 형식 맞는지, 이메일 중복 없는지 체크
      if (!userName || !email || !password || !phoneNumber || !address) {
        throw new Error('필수 정보가 모두 입력되었는지 확인해주세요.');
      }

      const regexEmail =
        /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regexEmail.test(email)) {
        throw new Error(
          '이메일 형식이 올바르지 않습니다. 이메일 형식을 다시 한 번 확인해주세요.'
        );
      }

      const regixPW =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;
      if (!regixPW.test(password)) {
        throw new Error('비밀번호 규칙을 다시 한 번 확인해주세요.');
      }

      const newUser = await userService.addUser({
        userName,
        email,
        password,
        phoneNumber,
        address,
        role,
        userStatus,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//로그인
userRouter.post(
  '/login',checkStatus,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (_.isEmpty(req.body)) {
        throw new Error(
          "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
        );
      }

      const email: string = req.body.email;
      const password: string = req.body.password;

      const userToken = await userService.getUserToken({ email, password });

  
      res.status(201).json({ userToken }); //userId, role, userStatus

    } catch (error) {
      next(error);
    }
  }
);

//일반회원 개인정보
userRouter.get('/user', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await userService.getUserData(userId);

    res.status(200).json(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

//일반회원 개인정보 수정
userRouter.patch('/users/:userEmail', loginRequired, async (req, res, next) => {
  try {
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    //잘못된 접근 에러 처리
    const userId = req.currentUserId;
    const user = await userService.getUserData(userId);
    const email = req.params.userEmail;

    if (email === user.email) {
      const userName: string = req.body.userName;
      const currentPassword = req.body.currentPassword;
      const password: string = req.body.newPassword;
      const phoneNumber: string = req.body.phoneNumber;
      const address: UserAddress = req.body.address;
      const role: string = req.body.role;
      // const {userName : string, password : string, phoneNumber : String, address, role}= req.body;

      if (!currentPassword) {
        throw new Error(req.body.currentPassword);
      }

      if(password) {
        const regixPW =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;
      if (!regixPW.test(password)) {
        throw new Error('비밀번호 규칙을 다시 한 번 확인해주세요.');
      }
      }
    

      const userInfoRequired = { email, currentPassword };

      const toUpdate = {
        ...(userName && { userName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
      };

      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );

      res.status(200).json(updatedUserInfo);
    } else {
      throw new Error(
        '잘못된 접근입니다. 로그인한 계정이 맞는지 확인해주세요.'
      );
    }
  } catch (error) {
    next(error);
  }
});

// 관리자의 일반 회원 전체 조회
userRouter.get('/userlist', adminOnly, async (req,res,next)=>{
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
})

// 일반 회원 탈퇴 
userRouter.patch('/expiration', loginRequired, async(req,res,next)=>{
  try {
    
    const userStatus = req.userStatus;
    const userId = req.currentUserId;

    const statusInfoRequired = {userId, userStatus};

    const updatedStatus = await userService.setStatus(statusInfoRequired);

    res.status(200).json(updatedStatus);


  } catch (error) {
    next(error)
  }
})

export { userRouter };
