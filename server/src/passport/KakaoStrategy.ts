import passport from 'passport';
import {Strategy as KakaoStrategy, Profile} from 'passport-kakao';
import {userModel} from '../db';
import {userService} from '../services';
import randomstring from 'randomstring';
import bcrypt from 'bcrypt';
import { nextTick } from 'process';

const kakaoConfig = {
    clientID : process.env.KAKAO_ID || "",
    callbackURL : "http://localhost:5000/api/oauth/kakao/callback"
}

async function kakaoVerify (
    accessToken : string,
    refreshToken : string,
    profile : Profile,
    done : any
) {
    try{
        const user = await userModel.findByEmail(profile._json.kakao_account.email);
        if(!user){
            const kakaoEmail = profile._json && profile._json.kakao_account.email;
            const kakaoNickname = profile._json && profile._json.kakaoNickname;
            const kakaoPassword = 'kakaoPassword';
            const hashedPassword = await bcrypt.hash(kakaoPassword, 10);
            const userInfomation = {
                userName : kakaoNickname,
                email : kakaoEmail,
                password : hashedPassword,
                InCaseOAuth : 'kakao'
            }

            const user = await userModel.create(userInfomation);
            done(null, user);
            return;
        }
        done(null, user);
        return;
    } catch (error) {
        // next(error)
        done(error)
    }
}

function passportKakaoConfig(){
    passport.use(new KakaoStrategy(kakaoConfig, kakaoVerify))
}

export {passportKakaoConfig}

