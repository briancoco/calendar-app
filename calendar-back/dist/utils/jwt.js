"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const CustomApiError_1 = __importDefault(require("../errors/CustomApiError"));
const http_status_codes_1 = require("http-status-codes");
const createToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (secret === undefined) {
        throw new CustomApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'No Secret, cannot create token');
    }
    return (0, jsonwebtoken_1.sign)(payload, secret);
};
exports.createToken = createToken;
