import {Router, Request, Response, NextFunction} from 'express';
import * as _ from 'lodash';  //npm install --save @types/lodash

import { userService } from "../service";
import {UserAddress} from '../db';

const userRouter = Router();


//회원가입
userRouter.post('/register', async(req : Request,res : Response, next : NextFunction)=>{
    try{

        //body가 빈 객체가 아닌지 확인
        if(_.isEmpty(req.body)){
            throw new Error("body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요")
        }

        //body의 회원등록 정보 가져오기
        const userName : string = req.body.userName;
        const email : string = req.body.email;
        const password : string = req.body.password;
        const phoneNumber : string = req.body.phoneNumber;
        const address : UserAddress = req.body.address;
        const role : string = req.body.role;
        const userStatus : string = req.body.userStatus;
        
        // 필수정보 기입되었는지, 이메일 형식 맞는지, 이메일 중복 없는지 체크
        if (!userName || !email || !password || !phoneNumber || !address) {
            throw new Error("필수 정보가 모두 입력되었는지 확인해주세요.");
          }

        const regexEmail = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regexEmail.test(email)) {
            throw new Error('이메일 형식이 올바르지 않습니다. 이메일 형식을 다시 한 번 확인해주세요.');
          }


        const regixPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/
        if (!regixPW.test(password)){
            throw new Error("비밀번호 규칙을 다시 한 번 확인해주세요.")
        }

        const newUser = await userService.addUser({
            userName,
            email,
            password,
            phoneNumber,
            address,
            role,
            userStatus,
        })

        res.sendStatus(201).json(newUser)

    } catch (error) {
        next(error)
    }
})

//로그인
userRouter.post('/login', async(req : Request,res : Response, next : NextFunction)=>{
    try{

        if(_.isEmpty(req.body)){
            throw new Error("body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요")
        }

        const email : string = req.body.email;
        const password : string = req.body.password;

        const userToken = await userService.getUserToken({email, password});

        // console.log(userToken);
        res.send(200).json(userToken); //userId, role, userStatus
    

    }
    catch(error){
        next(error)
    }
})


//일반회원 개인정보
userRouter.get('/')

export {userRouter};