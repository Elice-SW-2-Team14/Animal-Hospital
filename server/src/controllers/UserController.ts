import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { userService } from '../services';
import { HttpError} from '../middlewares';
import { blockInvalidRequest } from './Utils';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
// import { passportLoginVerify } from '../passport/LocalStrategy';
import logger from 'jet-logger';
import jwt from 'jsonwebtoken';



export async function registerUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
      
        // //body의 회원등록 정보 가져오기
        const {userName, email, password, phoneNumber, address} = req.body;
        
        // // 필수정보 기입되었는지 확인
        const requiredParams = ['userName','email','password','phoneNumber','address'];
        blockInvalidRequest(req.body, requiredParams);
        
        //중복이메일 체크
        const emailExists = await userService.isSameEmail(email);
        const regexEmail =
          /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regixPW =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;

        //오피스아워 반영 400에러코드 경우를 한번에 처리함
        if(emailExists || !regexEmail.test(email) || !regixPW.test(password)){
          throw new HttpError(400, "중복된 이메일이거나 이메일 형식 또는 비밀번호 형식이 맞지 않습니다.")
        } 
        
        const newUser = await userService.addUser({
          userName,
          email,
          password,
          phoneNumber,
          address
          });

        res.status(201).json(newUser);
        
    } catch (error) {
      next(error);
    }    
        
}

export async function loginUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
        
        const {email, password} = req.body;
        const requiredParams = ['email', 'password'];
        blockInvalidRequest(req.body, requiredParams);
     
        const isExpired = await userService.blockExpiredUser(email);

        if(isExpired){
            // TODO : 메인페이지 경로로 이동시키기
            
            res.status(400).json({
              result : "failed",
              message : "탈퇴한 회원입니다."})
        } 

        const userToken = await userService.getUserToken({ email, password });
        
                
        res.status(201).json({ userToken }); 

    } catch (error) {
        next(error)
    }
}

//passport-local login 위 로그인 코드 대체
export async function loginPassportCTR (req:Request, res:Response, next : NextFunction){
    try {
        
        passport.authenticate('local', (err, user, info) =>{
            if(err || !user) {
                res.status(400).json({
                    result : 'error',
                    reason : info.message
                })
                return
            }
            req.login(user, {session : false} , async(loginError)=>{
                        if(loginError) {
                            res.status(400).send(loginError);
                            return;
                        }
                        // const userToken = await userService.getUserToken({ email, password });
                        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
                        const token = jwt.sign(
                            {userId : user._id, role : user.role, userStatus : user.userStatus},
                            secretKey,
                            {expiresIn : '10d'}
                        )
                        res.status(200).json({
                            userToken : {
                                token,
                                role : user.role,
                                userStatus : user.userStatus
                            }
                        })
                    })
                    
        })(req, res ,next)

    } catch (error) {
        next(error)
    }
}

export async function getUserInfoCTR (req : Request, res : Response, next : NextFunction) {
    try {
        const userId = req.currentUserId;
        const currentUserInfo = await userService.getUserData(userId);
    
        res.status(200).json(currentUserInfo);
      } catch (error) {
        next(error);
      }
}

export async function updateUserInfoCTR (req : Request, res : Response, next : NextFunction) {
    try{
        // blockEmptyObject(req.body);
        blockInvalidRequest(req.body)

        //잘못된 접근 에러 처리
        const userId = req.currentUserId;
        const user = await userService.getUserData(userId);
        const email = req.params.userEmail;



        if(email === user.email) {
            const {userName, currentPassword, password, phoneNumber, address, role} = req.body;

            const regixPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;

            if(!currentPassword || !regixPW.test(password) ){

                throw new HttpError(400, "비밀번호가 없거나 비밀번호 규칙에 맞지 않습니다.")
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
            throw new HttpError(400, '잘못된 접근입니다. 로그인한 계정이 맞는지 확인해주세요.')
        }
    } catch (error) {
        next(error);
    }
}

export async function getAllUsersCTR (req : Request, res : Response, next : NextFunction) {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

export async function ExpireUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
    
        const userStatus = req.userStatus;
        const userId = req.currentUserId;
        const statusInfoRequired = {userId, userStatus};
        const updatedStatus = await userService.setStatus(statusInfoRequired);
    
        res.status(200).json({message : updatedStatus});
    
    
      } catch (error) {
        next(error)
      }
}


export async function loginKakaoCTR (req : Request, res : Response, next : NextFunction){
    try {
       
        passport.authenticate('kakao', (err, user ,info) =>{
            console.log('passport.authenticate(kakao)실행');
            if(!user){
                return res.redirect('http://localhost:3030/login')
            }
            console.log(user);
            console.log(req.user);
          
            req.login(user, async(err)=> {
                console.log('kakao-callback user : ', user);
                if(err){
                    next(err);
                    return;
                }

                const accessToken = await userService.getAccessToken(
                    user._id,
                    user.role,
                    user.userStatus
                )

                await userService.saveRefreshToken(user._id);

                return res.status(200).json({
                    userToken : {
                        accessToken,
                        role : user.role,
                        userStatus : user.userStatus
                    }
                })       
            });
        })(req,res);
        
    } catch (error) {
        next(error);
        return;
    }

}

export async function setUserStatusCTR (req : Request, res : Response, next : NextFunction){
    try{
        const isAdmin = req.userRole === "admin";  //로그인한 사용자의 role
        if(!isAdmin){
            throw new HttpError(403, "권한없는 사용자입니다.")
        }
        const {userId, userStatus} = req.body;
        console.log(req.userRole);
        console.log(req.body);
        const requiredParams = ['userId', 'userStatus'];
        blockInvalidRequest(req.body, requiredParams);
        
        const statusInfoRequired = {userId,userStatus}
        const updatedStatus = await userService.setUserStatus(statusInfoRequired);
        res.status(200).json(updatedStatus);

    } catch (error) {
        next(error)
    }
}
