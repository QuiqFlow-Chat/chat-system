import User from "../models/User";
import { GenericRepository } from "./genericRepository";

export class UserRepository extends GenericRepository<User>{
    constructor(){
        super(User);
    }

}