import {Router, Request, Response, NextFunction} from 'express';
import * as _ from 'lodash'; 
import { PetInfo } from '../db';
import { loginRequired } from '../middlewares/LoginRequired';
import {petService} from '../services/PetService';
import {upload} from '../utils'

const petRouter = Router();

interface PetInfoPostRequest {
    owner : string,
    species : string,
    breed : string,
    name : string,
    age :  number,   
    sex : string,
    weight : number,
    medicalHistory : string,
    vaccination? : string,
    neutralized? : string,
    image? : string

}

// 펫 정보 등록
petRouter.post('/register', loginRequired, upload.single('image'), async(req : Request, res : Response, next: NextFunction)=>{

    try {
        if(_.isEmpty(req.body)){
            throw new Error("header의 Content-type이 application/json이 맞는지 확인해주세요.")
        }
    
        const owner = req.currentUserId;

        const {species, breed, name, age, sex, weight, medicalHistory, vaccination, neutralized}  = req.body as PetInfoPostRequest;  

        let image = '';
        if(req.file){
            image = (req.file as Express.MulterS3.File).location;
        }

        
        const requiredParams = ['species', 'breed','name','age','sex','weight','medicalHistory']

        if (!requiredParams.every(param => req.body[param])) {

            throw new Error("필수 정보가 모두 입력되었는지 확인해주세요.")
        }
           
        const newPet = await petService.addPet({
            owner,
            species,
            breed,
            name,
            age,
            sex,
            weight,
            medicalHistory,
            vaccination,  //...(vaccination && {vaccination})
            neutralized,
            image
        })
    
        res.status(201).json(newPet)

    } catch (error) {
        next(error)
    }

})

// 펫 정보 조회
petRouter.get('/mypets', loginRequired, async(req : Request, res : Response, next: NextFunction)=>{
    try {
        const userId = req.currentUserId; //
        // const token = req.headers.authorization;
        // console.log(token);

        if(!userId){
            throw new Error("로그인 한 사용자가 아닙니다. 자신의 펫 정보 조회인지 확인해주세요")
        }

        const petInfos = await petService.getUserPetData(userId);
        res.status(200).json(petInfos);
    } catch(error){
        next(error)
    }
})


//펫 정보 수정
petRouter.patch('/update', loginRequired, upload.single('image'),async(req,res,next)=>{

    try{
        if(_.isEmpty(req.body)){
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            )
        }
    
    //수정권한있는 사용자 확인 필요?
        const currentOwner = req.currentUserId;

        const {petId, owner, species, breed, name, age, sex, weight,medicalHistory, vaccination, neutralized}  = req.body;

        let image = '';
        if(req.file){
            image = (req.file as Express.MulterS3.File).location;
        }

        console.log(image)


        const pet = await petService.getPetData(petId)

        if(owner === currentOwner) {

            const petInfoRequired = {owner, petId};

            const toUpdate = {
                ...(species && {species}),
                ...(breed && {breed}),
                ...(name && {name}),
                ...(age && {age}),
                ...(sex && {sex}),
                ...(weight && {weight}),
                ...(medicalHistory && {medicalHistory}),
                ...(vaccination && {vaccination}),
                ...(neutralized && {neutralized}),
                ...(image && {image})
            }

            const updatedPetInfo = await petService.setPet( petInfoRequired, toUpdate);

            res.status(200).json(updatedPetInfo)
        } else {
            throw new Error("잘못된 접근입니다. 펫 주인이 맞는지 확인해주세요.")
        }


    }catch(error){
        next(error)
    }

})


//펫 정보 삭제
petRouter.delete('/delete',loginRequired, async(req,res,next)=>{
    try{
        const {petId} = req.body;
        const deleteResult = await petService.deletePetData(petId);
        res.status(200).json(deleteResult);

    }catch(error){
        next(error)
    }
})

export {petRouter}