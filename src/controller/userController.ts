import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    public UserService = new UserService()
    constructor() {
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const response = await this.UserService.addUser(req.body)
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const response = await this.UserService.getAllUsers()
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    deleteUserByUId = async (req: Request, res: Response) => {
        try {
            const response = await this.UserService.deleteUserByUId(req.body)
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error)
        }
    }
}