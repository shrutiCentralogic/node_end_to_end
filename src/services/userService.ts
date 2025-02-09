export class UserService {
    constructor() {

    }

    addUser = async () => {
        try {
            return "Hello From Service"
        }
        catch (error) {
            return error
        }
    }
}