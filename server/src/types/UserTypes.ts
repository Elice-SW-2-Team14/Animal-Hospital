import {Types} from 'mongoose';

export enum UserStatus {
    NORMAL = 'normal',
    EXPIRED = 'expired',
  }

export interface UserAddress {
    postalCode?: string;
    address1?: string;
    address2?: string;
}

export interface UserInfo {
    userName : string,
    email : string,
    password : string,
    phoneNumber? : string,
    address? : UserAddress,
    pet? : object[],
    role ? : string,
    userStatus?  : string,
    InCaseOAuth? : string,
    
}

export interface UserData {
    _id : Types.ObjectId,
    userName : string,
    email : string,
    password : string,
    phoneNumber? : string,
    address? : UserAddress,
    pet? : object[],
    role ? : string,
    userStatus?  : string,
    InCaseOAuth? : string

}

export interface StatusInfoRequired {
    userId : string,
    userStatus : string
}

export interface LoginInfo {
    email: string;
    password: string;
  }
  
export interface LoginResult {
    token: string;
    role: string;
    userStatus: string;
  }
  
export interface UserInfoRequired {
    email: string;
    currentPassword: string;
  }

export interface UserDataPerPage { 
  users : UserData[],
  page : number;
  perPage : number;
  totalPage : number
}