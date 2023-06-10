"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomApiError_1 = __importDefault(require("../errors/CustomApiError"));
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomApiError_1.default) {
        return res.status(err.statusCode).json({ errorMsg: err.message });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMsg: err.message });
};
exports.default = errorHandler;
