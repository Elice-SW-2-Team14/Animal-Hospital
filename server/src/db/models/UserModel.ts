import mongoose, {model} from 'mongoose';
import { UserSchema } from "../schemas/UserSchema";

const User = model('users', UserSchema);

// export type Role = 'basic-user' | 'hispital' | 'admin';

export interface UserAddress {
    postalCode?: string;
    address1?: string;
    address2?: string;
}

export interface UserInfo {
    userName : string,
    email : string,
    password : string,
    phoneNumber : string,
    address : UserAddress,
    role ? : string,
    userStatus  : string,
    
}

export interface UserData extends UserInfo{
    _id : mongoose.Types.ObjectId
}

interface ToUpdate {
    email : string,
    update : {
        [key: string] : string | UserAddress;
    }
}

export interface StatusInfoRequired {
    userId : string,
    userStatus : string
}
export class UserModel {
    async findByEmail(email : string) : Promise<UserData | null> {
        const user = await User.findOne({email});
        return user;
    }

    async create(userInfo : UserInfo) : Promise<UserInfo> {
        const createdNewUser = await User.create(userInfo);
        return createdNewUser;
    }

    async findById(userId : string) : Promise<UserData | null>{
        const user = await User.findOne({_id:userId});
        return user;
    }

    async update({email, update} : ToUpdate) : Promise<UserData | null>{
        const filter = {email : email};
        const option = {returnOriginal : false};
        const updatedUser = await User.findOneAndUpdate(filter, update, option);

        return updatedUser;
    }

    async findAll() : Promise<UserData[]>{
        const users = await User.find({});
        return users;
    }

    async updateStatus({userId, userStatus} : StatusInfoRequired) : Promise<string | undefined> {
        const filter = {_id : userId};
        const option = {returnOriginal : false};
        const updatedUser = await User.findOneAndUpdate(filter, {userStatus : 'expired'}, option);
        console.log(updatedUser);
        const updatedStatus = updatedUser?.userStatus;
        return updatedStatus;
    }
}

const userModel = new UserModel();

export {userModel};