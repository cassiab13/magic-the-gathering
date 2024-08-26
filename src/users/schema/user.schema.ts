import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role } from "../../roles/roles.enum";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    _id?: Types.ObjectId;
    
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true, minlength: 8})
    password: string;

    @Prop({ type: [String], enum: Role, default: [Role.User] })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);