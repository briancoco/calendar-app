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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
dotenv_1.default.config();
const app = (0, express_1.default)();
//routers
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const taskRouter_1 = __importDefault(require("./routes/taskRouter"));
//middleware
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const authUser_1 = __importDefault(require("./middleware/authUser"));
app.use(express_1.default.json());
app.use('/api/auth', authRouter_1.default);
app.use('/api/tasks', authUser_1.default, taskRouter_1.default);
app.get('/', (req, res) => {
    return res.send('Hello World');
});
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    //attempt to connect to the DB
    //if successful, then spin up the web server
    //otherwise, log the error message
    try {
        const dbConnectString = process.env.MONGO_URL;
        if (dbConnectString === undefined) {
            throw new Error('Connection string not provided');
        }
        yield mongoose_1.default.connect(dbConnectString);
        app.listen(3001, () => {
            console.log('listening on port 3001');
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
start();
