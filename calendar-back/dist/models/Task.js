"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    startTime: {
        type: String,
        required: [true, 'Please provide start time']
    },
    endTime: {
        type: String,
        required: [true, 'Please provide end time']
    },
    title: {
        type: String,
        required: [true, 'Please provide title']
    },
    month: {
        type: Number,
        required: [true, 'please provide month'],
        min: 0,
        max: 11
    },
    day: {
        type: Number,
        required: [true, 'please provide day'],
        min: 1,
        max: 31
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    }
});
exports.default = mongoose_1.default.model('Tasks', TaskSchema);
