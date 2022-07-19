import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

async function loginRequired (req : Request, res : Response, next: NextFunction):Promise<void> {

    const userToken = req.headers['authorization']?.split(' ')[1];

    if(!userToken || userToken === 'null') {
        res.status(403).json({
            result : 'forbidden-approach',
            reason : '로그인한 사용자만 접근할 수 있는 서비스입니다.'
        });

        return;
    }

    

    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify( userToken, secretKey) as JwtPayload;
        const userId = jwtDecoded.userId;
        const userStatus = jwtDecoded.userStatus;
        const role = jwtDecoded.role;

        if(userStatus === "expired") {
            throw new Error("탈퇴한 사용자입니다.")
            return;
        }
        //로그인한 유저의 userId를 request객체의 속성으로 보내줌
        req.currentUserId = userId;
        req.userStatus = userStatus;
        req.userRole = role;
        
        next()

        

    } catch(error) {
        res.status(403).json({
            result : 'forbidden-approach',
            reason : '정상적인 토큰이 아닙니다.'
        });

        return;
    }
}

export {loginRequired};