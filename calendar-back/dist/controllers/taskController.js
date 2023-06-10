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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const http_status_codes_1 = require("http-status-codes");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const tasks = yield Task_1.default.find({ createdBy: userId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ tasks });
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user)
        req.body.createdBy = req.user.userId;
    const task = yield Task_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ task });
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const task = yield Task_1.default.findOneAndUpdate({ _id: taskId, createdBy: req.user.userId }, req.body, {
        runValidators: true,
        new: true
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ task });
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const task = yield Task_1.default.deleteOne({ _id: taskId, createdBy: req.user.userId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ task });
});
exports.deleteTask = deleteTask;
