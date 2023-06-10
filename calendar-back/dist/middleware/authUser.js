"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomApiError_1 = __importDefault(require("../errors/CustomApiError"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
//user authentication middleware
const authUser = (req, res, next) => {
    //1. get the token from the request header
    //2. validate token
    //3. append payload onto request obj
    //4. sent request to next middleware in the queue
    let token = req.header('Authorization');
    if (!token) {
        throw new CustomApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Please provide authentication token');
    }
    token = token.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new CustomApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Please provide jwt secret');
    }
    const payload = (0, jsonwebtoken_1.verify)(token, secret);
    if (typeof payload === 'string') {
        throw new CustomApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid Token');
    }
    else {
        req.user = payload;
        next();
    }
};
exports.default = authUser;
