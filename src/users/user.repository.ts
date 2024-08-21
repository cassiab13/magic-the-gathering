import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schema/user.schema";
import { CrudRepository } from "src/crud/crud.repository";

export class UserRepository extends CrudRepository <User>{
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>) {
        super(userModel);
    }
    
    public async findByUsernameOrEmail(
        email: string,
        username: string,
      ): Promise<User | null> {
        return this.userModel
          .findOne({ $or: [{ email: email }, { username: username }] })
          .exec();
      }
}