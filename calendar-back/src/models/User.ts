import mongoose from "mongoose";

//we need to define an interface for the expected input to create a user
//also we need an interface for the expected fields of our schema

export interface UserInput {
  username: string,
  password: string  
}

interface User extends UserInput {
    _id: string,
}

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 1
    }
});

export default mongoose.model<User>('Users', UserSchema);
