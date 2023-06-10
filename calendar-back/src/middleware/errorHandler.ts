import CustomAPIError from "../errors/CustomApiError";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error | CustomAPIError, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({errorMsg: err.message});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errorMsg: err.message});
}

export default errorHandler;