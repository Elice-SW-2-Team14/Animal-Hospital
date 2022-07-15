import mongoose, { model } from 'mongoose';
import { HospitalSchema } from '../schemas/HospSchema';

const Hospital = model('hospitals', HospitalSchema);

export interface Address {
  postalCode: string;
  address1: string;
  address2: string;
}

export interface addressCoordinate {
  x: string;
  y: string;
}

export interface HospitalRegisterData {
  name: string;
  email: string;
  director: string;
  password: string;
  address: Address;
  phoneNumber: string;
  businessNumber: string;
  licenseNumber: string;
}

export interface HospitalInfo {
  name: string;
  email: string;
  director: string;
  password: string;
  address: Address;
  addressCoordinate?: addressCoordinate;
  phoneNumber: string;
  businessHours?: number[];
  businessNumber: string;
  licenseNumber: string;
  holiday?: string[];
  hospitalCapacity?: number;
  tag?: object[];
  keyword?: string[];
  image?: string;
  refreshToken?: string;
  hospStatus?: mongoose.Types.ObjectId;
  hospRegStatus?: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}

export interface ToUpdate {
  hospitalId: mongoose.Types.ObjectId;
  update: {
    [key: string]:
      | string
      | number
      | Address
      | addressCoordinate
      | number[]
      | string[]
      | object[]
      | mongoose.Types.ObjectId;
  };
}

export interface HospitalInfoRequired {
  hospitalId: string;
  currentPassword: string;
}

export interface HospitalLoginResult {
  accessToken: string;
  hospitalname: string;
}

export class HospitalModel {
  async create(hospitalInfo: HospitalRegisterData): Promise<HospitalInfo> {
    const createdNewHospital = (await Hospital.create(
      hospitalInfo
    )) as HospitalInfo;
    return createdNewHospital;
  }

  async findByEmail(email: string): Promise<HospitalInfo> {
    const hospital = (await Hospital.findOne({ email })) as HospitalInfo;
    return hospital;
  }

  async findByName(name: string): Promise<HospitalInfo> {
    const hospital = (await Hospital.findOne({ name })) as HospitalInfo;
    return hospital;
  }

  async findById(_id: string): Promise<HospitalInfo> {
    const hospital = (await Hospital.findById(_id)) as HospitalInfo;
    return hospital;
  }

  async updateRefreshToken({
    hospitalId,
    update,
  }: ToUpdate): Promise<HospitalInfo> {
    const filter = { _id: hospitalId };
    const option = { returnOriginal: false };

    const updatedUser = (await Hospital.findOneAndUpdate(
      filter,
      update,
      option
    )) as HospitalInfo;
    return updatedUser;
  }

  async update({ hospitalId, update }: ToUpdate): Promise<HospitalInfo> {
    const filter = { _id: hospitalId };
    const option = { returnOriginal: false };

    const updatedHospital = (await Hospital.findOneAndUpdate(
      filter,
      update,
      option
    )) as HospitalInfo;
    return updatedHospital;
  }
}

const hospitalModel = new HospitalModel();

export { hospitalModel };
