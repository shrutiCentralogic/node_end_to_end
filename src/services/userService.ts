import mongoose from "mongoose";
import { generateSchemaFromObject } from "../common/customSchema";
import { User } from "../models/userModel"
import { UserDBService } from "../databaseService/userDBService";


export class UserService {
    UserDBService: UserDBService
    constructor() {
        this.UserDBService = new UserDBService()
    }

    addUser = async (userData: User) => {
        try {

            const newUser = new User(userData)
            newUser.initialize(true, "User", "Admin", "Admin")
            let response = await this.UserDBService.addUser(newUser)

            return await response

        } catch (error) {
            throw error
        }
    }

    getAllUsers = async () => {
        try {
            const users = await this.UserDBService.getAllUsers({})
            return await { users }
        }
        catch (error) {
            throw error
        }
    }

    deleteUserByUId = async (requestObj: any) => {
        try {
            const response = await this.UserDBService.deleteUserByUId(requestObj.uId)
            return response
        }
        catch (error) {
            throw error
        }

    }

}