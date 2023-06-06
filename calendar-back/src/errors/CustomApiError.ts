import { StatusCodes } from "http-status-codes";

export default class CustomAPIError extends Error {
    public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
    public constructor(statusCode: number, msg: string) {
        super(msg);
        this.statusCode = statusCode;
    }
}