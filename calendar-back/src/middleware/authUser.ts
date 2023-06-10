import { Request, Response, NextFunction } from "express";
import CustomAPIError from "../errors/CustomApiError";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { Payload } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
//user authentication middleware

const authUser = (req: Request, res: Response, next: NextFunction) => {
    //1. get the token from the request header
    //2. validate token
    //3. append payload onto request obj
    //4. sent request to next middleware in the queue

    let token = req.header('Authorization');
    if(!token) {
        throw new CustomAPIError(StatusCodes.BAD_REQUEST, 'Please provide authentication token');
    }

    token = token.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if(!secret) {
        throw new CustomAPIError(StatusCodes.INTERNAL_SERVER_ERROR, 'Please provide jwt secret');
    }
    const payload = verify(token, secret);
    if(typeof payload === 'string') {
        throw new CustomAPIError(StatusCodes.UNAUTHORIZED, 'Invalid Token');
    }else {
        req.user = payload;
        next();
    }
    
    

}

export default authUser;