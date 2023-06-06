import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'express-async-errors';
dotenv.config();
const app = express();

//routers
import authRouter from './routes/authRouter';

//middleware
import notFoundMiddleware from './middleware/notFound';
import errorHandlerMiddleware from './middleware/errorHandler';

app.use(express.json());
app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello World');
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async (): Promise<void> => {
    //attempt to connect to the DB
    //if successful, then spin up the web server
    //otherwise, log the error message
    try {
        const dbConnectString = process.env.MONGO_URL;
        if(dbConnectString === undefined) {
            throw new Error('Connection string not provided');
        }
        await mongoose.connect(dbConnectString)
        app.listen(3001, () => {
            console.log('listening on port 3001');
        })
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message);
        }
    }
}

start();