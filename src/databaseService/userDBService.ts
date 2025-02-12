import mongoose from "mongoose";
import { generateSchemaFromObject } from "../common/customSchema";
import { ENV } from "../config/envConfig";

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

    getAllUsers = async (requestObj: any) => {
        try {
            let Obj = { ...requestObj, active: true, archived: false }
            const collection = mongoose.connection.collection(ENV.USER_COLLECTION);
            const documents = await collection.find(Obj).toArray();
            return documents;
        } catch (error) {
            console.error("Error fetching users", error);
            throw new Error('Unable to fetch users');
        }
    }

    deleteUserByUId = async (uId: any) => {
        try {
            const collection = mongoose.connection.collection(ENV.USER_COLLECTION);
            const updateDoc = {
                $set: {
                    archived: true
                }
            };
            const record = await collection.findOne({ "uId": uId, "active": true, "archived": false })

            if (record) {
                const result: any = await collection.findOneAndUpdate({ "uId": uId, "active": true, "archived": false }, updateDoc)
                return { message: "User Deleted Successfully!" }
            }
            else {
                return { message: "No User found" }
            }
        }
        catch (error) {
            console.error("Error fetching users", error);
            throw new Error('Unable to fetch users');
        }
    }

   

}