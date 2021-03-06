import mongoose, {model, Types} from 'mongoose';
import {PetSchema} from '../schemas/PetSchema';
import { UserSchema } from "../schemas/UserSchema";

const Pet = model('pets', PetSchema);

export interface PetInfo {
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

//PetData면 되지 않는가? owner와 연동 확인후 수정하기
export interface PetData extends PetInfo {
    _id : Types.ObjectId,
    
   
}

export interface PetToUpdate {
    petId : string,
    update : {
        [key : string] : string | number;
    }
}
export class PetModel {

    async create(petInfo : PetInfo) : Promise<PetData> {
        const createdNewPet = await Pet.create(petInfo);
        return createdNewPet;
    }


    async findById(ownerId : string) : Promise<PetData[]>{
        const owner = await Pet.find({owner: ownerId})
        return owner;
    }

    async findByPetId(petId : string) : Promise<PetData | null>{
        const pet = await Pet.findOne({_id : petId});
        return pet;
    }

    async update({petId, update}: PetToUpdate)
: Promise<PetData | null>{
    const filter = {_id : petId};
    const option = {returnOriginal : false};
    const updatedPet = await Pet.findOneAndUpdate(filter, update, option);

    return updatedPet;
}

    async deleteById( petId : string) : Promise<{deletedCount : number}> {
        const result = await Pet.deleteOne({_id : petId});
        return result;
    }

}

const petModel = new PetModel();

export {petModel};
