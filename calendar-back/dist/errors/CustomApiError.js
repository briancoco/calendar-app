"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class CustomAPIError extends Error {
    constructor(statusCode, msg) {
        super(msg);
        this.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        this.statusCode = statusCode;
    }
}
exports.default = CustomAPIError;
