import mongoose, {model, Types} from 'mongoose';
import { UserSchema } from "../schemas/UserSchema";
import {UserAddress, UserInfo, UserData, StatusInfoRequired, UserStatus} from '../../types/UserTypes';
import {HttpError} from '../../middlewares/ErrorHandler';


const User = model('users', UserSchema);
interface ToUpdate {
    email : string,
    update : {
        [key: string] : string | UserAddress |object[];
    }
}


export class UserModel {
    async findByEmail(email : string) : Promise<UserData | null> {
        const user = await User.findOne({email});
        
        return user;
    }

    async create(userInfo : UserInfo) : Promise<UserInfo> {
        const createdNewUser = await User.create(userInfo);
        if(!createdNewUser){
            throw new HttpError(400, "db 입력 실패")
        }
        return createdNewUser;
    }

    async findById(userId : string) : Promise<UserData>{
        const user = await User.findOne({_id:userId});
        if(!user){
            throw new Error("정보를 찾을 수 없습니다");
        }
        return user;
    }

    async update({email, update} : ToUpdate) : Promise<UserData>{
        const filter = {email : email};
        const option = {returnOriginal : false};
        const updatedUser = await User.findOneAndUpdate(filter, update, option);
        if(!updatedUser){
            throw new Error("유저 상태를 찾을 수 없습니다")
        }
        return updatedUser;
    }

    async findAll() : Promise<UserData[]>{
        const users = await User.find({});
        return users;
    }

    async statusExpired({userId} : StatusInfoRequired) : Promise<string> {
        const filter = {_id : userId};
        const option = {returnOriginal : false};
        const updatedUser = await User.findOneAndUpdate(filter, {userStatus : 'expired'}, option);
        console.log(updatedUser);

        if(!updatedUser){
            throw new Error("유저 상태를 찾을 수 없습니다")
        }
        const updatedStatus = updatedUser.userStatus;
        return updatedStatus;
    }


    async updateUserStatus(statusInfoRequired : StatusInfoRequired) : Promise<UserData>{
        const {userId, userStatus} = statusInfoRequired;
        const filter = {_id : userId};
        const toUpdate = userStatus===UserStatus.EXPIRED ? UserStatus.NORMAL : UserStatus.EXPIRED;
        console.log(toUpdate);
        const option = {returnOriginal : false};
        const updatedUser = await User.findOneAndUpdate(filter, {userStatus : toUpdate}, option );
        console.log(updatedUser);
        if(!updatedUser){
            throw new Error("사용자 상태를 변경할 수 없습니다.")
        }
        return updatedUser;
    }


    async updateRefreshToken(userId : string, refreshToken : string) {
        const filter = {_id : userId};
        const updatedUser = await User.findOneAndUpdate(filter, {
            $set : {
                refreshToken
            }
        })
        return updatedUser;
    }

    async deleteRefreshToken(userId : string){
        const filter = {_id : userId};
        const updatedUser = await User.findOneAndUpdate(filter, {
            $unset : {
                refreshToken: ""
            }
        })
        return updatedUser;
    }
}

const userModel = new UserModel();

export {userModel};