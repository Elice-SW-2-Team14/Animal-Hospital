import { Types } from "mongoose";

export interface ReviewInfo {
    userId : string,
    targetHospital : string,
    date : Date,
    content : string,
    like : number
}

export interface ReviewData {
    _id : Types.ObjectId
    userId : string,
    targetHospital : string,
    date : Date,
    content : string,
    like : number
}