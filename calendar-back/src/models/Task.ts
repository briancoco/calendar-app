import mongoose from "mongoose";

interface TaskInput {
    startTime: string,
    endTime: string,
    title: string,
    month: number,
    day: number,
    createdBy: string
}

interface Task extends TaskInput {
    _id: string,
}

const TaskSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
        required: true
    }
})

export default mongoose.model<Task>('Tasks', TaskSchema);

