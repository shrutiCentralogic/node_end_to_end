import { IUser, MongooseUserModel } from "../models/userModel";

export class UserService {
    constructor() {

    }

    addUser = async (userData: IUser) => {
        try {
            // 🔹 Check if user already exists
            const existingUser = await MongooseUserModel.findOne({ email: userData.email });
            if (existingUser) {
              throw new Error('User with this email already exists');
            }
        
           
        
            // 🔹 Create user object
            const newUser = await new MongooseUserModel({
              name: userData.name,
              email: userData.email,
              password: userData.password, // Store hashed password
              createdBy: "",
              createdByName: "",
            });
        
            // 🔹 Save user to MongoDB
            const savedUser = await newUser.save();
            return await { success: true, data: savedUser };
          } catch (error:any) {
            return { success: false, error: error.message };
          }
    }
}