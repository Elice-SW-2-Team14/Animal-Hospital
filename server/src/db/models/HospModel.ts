import mongoose, { model } from 'mongoose';
import { HospitalSchema } from '../schemas/HospSchema';

const Hospital = model('hospitals', HospitalSchema);

export interface Address {
  postalCode: string;
  address1: string;
  address2: string;
}

export interface SearchOptions {
  [key: string]: string | mongoose.Types.ObjectId;
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
  image?: string[];
  refreshToken?: string;
  hospStatus?: mongoose.Types.ObjectId;
  hospRegStatus?: mongoose.Types.ObjectId;
  starRating?: number;
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
  hospitalState: string;
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

  async countHospitals(searchOptions: SearchOptions): Promise<number> {
    const counts = await Hospital.countDocuments(searchOptions);
    return counts;
  }

  async findByOption(
    page: number,
    perPage: number,
    searchOptions: SearchOptions
  ): Promise<HospitalInfo[]> {
    const users = (await Hospital.find(searchOptions, {
      _id: 0,
      email: 0,
      password: 0,
      director: 0,
      addressCoordinate: 0,
      businessNumber: 0,
      licenseNumber: 0,
      refreshToken: 0,
      hospStatus: 0,
      hospRegStatus: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)) as HospitalInfo[];
    return users;
  }
}

const hospitalModel = new HospitalModel();

export { hospitalModel };
