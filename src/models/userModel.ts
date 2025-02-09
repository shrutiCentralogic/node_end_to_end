import mongoose, { Schema, Document } from "mongoose";
import BaseEntity from "../common/baseEntity";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema(
    {
        ...BaseEntity,
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);


export default mongoose.model<IUser>("User", UserSchema);
