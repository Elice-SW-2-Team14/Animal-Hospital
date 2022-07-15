import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

function adminOnly(req : Request, res: Response, next : NextFunction) {
    const userToken = req.headers['authorization']?.split(' ')[1];

    // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
    if(!userToken || userToken === 'null'){
        console.log("서비스 사용 요청이 있지만 인가 토큰이 없습니다.")
        res.status(403).json({
            result : "fotbidden-approach",
            resaon : '로그인한 유저만 사용할 수 있는 서비스입니다.',
        });
        
        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify(userToken, secretKey) as JwtPayload;
        const role = jwtDecoded.role;
        console.log('role from admin middleware: ', role)

        if(role !== 'admin'){
            console.log('서비스 사용 요청이 있지만 관리자가 아닙니다')
            res.status(403).json({
                resuslt : "forbidden-approach",
                reason : "관리자만 사용할 수 있는 서비스입니다"
            })
            return;
        }

        next()
    } catch (error) {
        next(error)
        return;
    }
}

export {adminOnly};