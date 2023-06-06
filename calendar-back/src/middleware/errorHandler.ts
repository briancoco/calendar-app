import CustomAPIError from "../errors/CustomApiError";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error | CustomAPIError, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomAPIError) {
        res.status(err.statusCode).json({errorMsg: err.message});
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errorMsg: err.message});
}

export default errorHandler;