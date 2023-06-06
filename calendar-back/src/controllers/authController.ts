import StatusCodes from 'http-status-codes';
import {Request, Response} from 'express';
import CustomAPIError from '../errors/CustomApiError';
import User, {UserInput} from '../models/User';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const {username, password} = req.body;
    if(!username || !password) {
        throw new CustomAPIError(StatusCodes.BAD_REQUEST, 'Please provide both username and password');
    }
    const user = await User.findOne({username});
    if(!user || user.password !== password) {
        throw new CustomAPIError(StatusCodes.UNAUTHORIZED, 'Invalid Credentials');
    }

   return res.status(StatusCodes.OK).json({msg: 'Login successful'});

}

export const register = async (req: Request, res: Response): Promise<Response> => {
    const {username, password} = req.body;
    if(!username || !password) {
        throw new CustomAPIError(StatusCodes.BAD_REQUEST, 'Please provide both username and password');
    }
    const user = await User.create<UserInput>({username, password});

    return res.status(StatusCodes.CREATED).json({user});
}


