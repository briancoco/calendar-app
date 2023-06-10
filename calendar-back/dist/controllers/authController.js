"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const CustomApiError_1 = __importDefault(require("../errors/CustomApiError"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const jwt_1 = require("../utils/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Please provide both username and password');
    }
    const user = yield User_1.default.findOne({ username });
    if (!user) {
        throw new CustomApiError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Invalid Credentials');
    }
    const isPasswordValid = yield (0, auth_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new CustomApiError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Invalid Credentials');
    }
    //Create and send token
    //We will not attach token to cookie(doesn't work well in development with react)
    const token = (0, jwt_1.createToken)({ userId: user._id });
    return res.status(http_status_codes_1.default.OK).json({ token });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    if (!username || !password) {
        throw new CustomApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Please provide both username and password');
    }
    password = yield (0, auth_1.hashPassword)(password);
    const user = yield User_1.default.create({ username, password });
    return res.status(http_status_codes_1.default.CREATED).json({ user });
});
exports.register = register;
