import passport from 'passport';
import {userModel} from '../db';
import {passportLocalConfig} from './LocalStrategy';
import {passportKakaoConfig} from './KakaoStrategy';

export function passportConfig(){
    passport.serializeUser((user, done) => {
        console.log('serializeUser', user);
        done(null, user);
    });
    
    passport.deserializeUser(async(userId : string, done) => {
        console.log('deserializeUser', userId); // id 불러오는지 확인
    
        const user = await userModel.findById(userId);
        if(!user){
            done('회원정보를 찾을 수 없습니다.')
        }
        done(null, user);
        
       
    });
    
    passportLocalConfig();
    
    passportKakaoConfig();
}