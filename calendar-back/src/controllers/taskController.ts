import { Request, Response } from "express";
import Task from "../models/Task";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/CustomApiError";

export const getTasks = async (req: Request, res: Response) => {
    const {userId} = req.user;
    const tasks = await Task.find({createdBy: userId});
    res.status(StatusCodes.OK).json({tasks});
}

export const createTask = async (req: Request, res: Response) => {
    if(req.user)
        req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({task});
}

export const updateTask = async (req: Request, res: Response) => {
    const {id: taskId} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskId, createdBy: req.user.userId}, req.body, {
        runValidators: true,
        new: true
    });
    res.status(StatusCodes.OK).json({task});
}

export const deleteTask = async (req: Request, res: Response) => {
    const {id: taskId} = req.params;
    const task = await Task.deleteOne({_id: taskId, createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({task});
}

