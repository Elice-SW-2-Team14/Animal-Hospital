import { PetData, PetInfo, petModel, PetModel,  } from "../db";

interface PetInfoRequired {
    owner : string,
    petId : string
}
class PetService {
    constructor(
        private petModel : PetModel) {}

    //펫 정보 등록
    async addPet(petInfo : PetInfo) : Promise<PetData>{
        const {owner, species, breed, name, age, sex, weight,medicalHistory, vaccination, neutralized, image} = petInfo;
        
        const createdPet = await this.petModel.create(petInfo);
        return createdPet;

    }

    //펫 정보 수정
    async setPet(
        petInfoRequired : PetInfoRequired,
        toUpdate : Partial<PetInfo>
        ) : Promise<PetData | null> {

        
        const {owner, petId} = petInfoRequired;
        if (!owner){
            throw new Error("로그인한 펫 주인이 맞는지 확인해주세요.")
        } else if(!petId) {
            throw new Error("정보를 수정하려는 pet을 골라주세요.")
        }

        let pet = await this.petModel.findByPetId(petId);

        pet = await this.petModel.update({petId, update : toUpdate});

        return pet;
       
        }


    // 펫 정보(사용자의 펫 전체) 조회 
    async getUserPetData ( ownerId : string) : Promise<PetData[]> {

        const pets = await this.petModel.findById(ownerId);

        if(!ownerId) {
            throw new Error("가입 내역이 없습니다. 이메일을 다시 확인해주세요.")
        }

        if(!pets){
            throw new Error("조회되는 펫 정보가 없습니다.")
        }

        return pets;

        

    }

    //개별 펫 정보 조회
    async getPetData ( petId : string) : Promise<PetData> {

        const pet = await this.petModel.findByPetId(petId);

        if(!pet){
            throw new Error("조회되는 펫 정보가 없습니다.")
        }

        return pet;
    }

}


const petService = new PetService(petModel);

export {petService};