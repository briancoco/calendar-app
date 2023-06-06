import { Request, Response } from "express";


const notFound = (req: Request, res: Response) => {
    res.send('Route not found');
}

export default notFound;