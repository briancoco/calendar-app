import StatusCodes from 'http-status-codes';
import {Request, Response} from 'express';
import CustomAPIError from '../errors/CustomApiError';
import User, {UserInput} from '../models/User';
import { hashPassword, comparePassword } from '../utils/auth';
import { createToken } from '../utils/jwt';

export const login = async (req: Request<{}, {}, {username: string, password: string}>, res: Response): Promise<Response> => {
    const {username, password} = req.body;
    if(!username || !password) {
        throw new CustomAPIError(StatusCodes.BAD_REQUEST, 'Please provide both username and password');
    }
    const user = await User.findOne({username});
    if(!user) {
        throw new CustomAPIError(StatusCodes.UNAUTHORIZED, 'Invalid Credentials');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid) {
        throw new CustomAPIError(StatusCodes.UNAUTHORIZED, 'Invalid Credentials');
    }

    //Create and send token
    //We will not attach token to cookie(doesn't work well in development with react)
    const token = createToken({userId: user._id});

   return res.status(StatusCodes.OK).json({token});

}

export const register = async (req: Request<{}, {}, {username: string, password: string}>, res: Response): Promise<Response> => {
    let {username, password} = req.body;
    if(!username || !password) {
        throw new CustomAPIError(StatusCodes.BAD_REQUEST, 'Please provide both username and password');
    }

    password = await hashPassword(password);
    const user = await User.create<UserInput>({username, password});

    return res.status(StatusCodes.CREATED).json({user});
}


