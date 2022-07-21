export interface PetInfoType {
  _id: string;
  image?: string;
  owner: string;
  species: string;
  breed: string;
  name: string;
  age: number;
  sex: string;
  weight: number;
  medicalHistory: string;
  // 필수?
  vaccination?: string;
  neutralized?: string;
}
