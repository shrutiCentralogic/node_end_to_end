import mongoose from "mongoose";
import { generateSchemaFromObject } from "../common/customSchema";

export class UserDBService {
    constructor() { }

    addUser = async (newUser: any) => {
        try {
            const DynamicSchema = generateSchemaFromObject(newUser);
            const DynamicModel: any = mongoose.models["User"] || mongoose.model("User", DynamicSchema);
            const newUserInstance = new DynamicModel(newUser);
            await newUserInstance.save();
            return newUserInstance
        }
        catch (err) {
            throw err
        }

    }
}