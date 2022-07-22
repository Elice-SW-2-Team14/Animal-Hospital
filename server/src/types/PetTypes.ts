import {Types} from 'mongoose';

export interface PetInfo {
    owner : string,
    species : string,
    breed : string,
    name : string,
    age? :  number,   
    sex : string,
    weight : number,
    medicalHistory : string,
    vaccination? : string,
    neutralized? : string,
    image? : string
            
}

//PetData면 되지 않는가? owner와 연동 확인후 수정하기
export interface PetData {
    _id : Types.ObjectId,
    owner : string,
    species : string,
    breed : string,
    name : string,
    age? :  number,   
    sex : string,
    weight : number,
    medicalHistory : string,
    vaccination? : string,
    neutralized? : string,
    image? : string
    
   
}