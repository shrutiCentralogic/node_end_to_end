import { Request, Response, Router } from "express";
import { UserController } from "../controller/userController";

export class UserRoutes {
    private readonly router: Router
    private readonly userController:UserController=new UserController()

    constructor() {
        this.router = Router()
        this.configureRoutes()
    }

    configureRoutes() {

        this.router.post("/addUser", (req: Request, res: Response) => this.userController.addUser(req,res))
        this.router.get("/getAllUsers",(req: Request, res: Response) => this.userController.getAllUsers(req,res))
        this.router.post("/deleteUser",(req: Request, res: Response) => this.userController.deleteUserByUId(req,res))
    }

    getRouter(): Router {
        return this.router;
    }

    
}