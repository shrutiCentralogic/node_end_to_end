import { BaseEntity } from "../common/baseEntity";

export class User extends BaseEntity {
    name: String
    email: String
    age: Number
    constructor(user:User) {
        super()
        this.name = user.name
        this.email = user.email
        this.age = user.age
    }

}

