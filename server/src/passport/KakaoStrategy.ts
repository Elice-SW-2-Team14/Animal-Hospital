import passport from 'passport';
import {Strategy as KakaoStrategy, Profile} from 'passport-kakao';
import {userModel} from '../db';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import {UserInfo} from '../types/UserTypes';
import {userService} from '../services/UserService'

const kakaoConfig = {
    clientID : process.env.KAKAO_ID || "",
    callbackURL : "/api/login/kakao/callback"
}

async function kakaoVerify (
    accessToken : string,
    refreshToken : string,
    profile : Profile,
    done : any
) {
    try{
        console.log('profile : ', profile);
        const user = await userModel.findByEmail(profile._json.kakao_account.email);
        if(!user){
            const kakaoEmail = profile._json && profile._json.kakao_account.email;
            const kakaoNickname = profile.displayName && profile.displayName;
            const kakaoPassword = randomstring.generate(10);
            // const hashedPassword = await bcrypt.hash(kakaoPassword, 10);
            const userInformation : UserInfo = {
                userName : kakaoNickname,
                email : kakaoEmail,
                password : kakaoPassword,
                InCaseOAuth : 'kakao'
            }

            console.log('카카오이메일: ',kakaoEmail);
            console.log(kakaoNickname);
            console.log('userInfo: ', userInformation);

            const newUser = await userService.addUser(userInformation);
            console.log(newUser);
            if(!newUser){
                console.log('creating user failed')
            }
            
            done(null, newUser);
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

