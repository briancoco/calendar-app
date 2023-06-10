import {sign} from 'jsonwebtoken';
import CustomAPIError from '../errors/CustomApiError';
import { StatusCodes } from 'http-status-codes';

export interface Payload {
    userId: string
}

export const createToken = (payload: Payload): string => {
    const secret = process.env.JWT_SECRET;
    if(secret === undefined) {
        throw new CustomAPIError(StatusCodes.INTERNAL_SERVER_ERROR, 'No Secret, cannot create token')
    }
    return sign(payload, secret)
}

