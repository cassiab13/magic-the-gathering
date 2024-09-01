import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role } from "../../roles/roles.enum";
import { Permission } from "src/permissions/permissions.enum";

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

    @Prop({ type: [String], enum: Role })
    role: [Role];
    
    @Prop({ type: [String], enum: Permission })
    permission: [Permission];
}

export const UserSchema = SchemaFactory.createForClass(User);