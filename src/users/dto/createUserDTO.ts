import { OmitType } from "@nestjs/mapped-types";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "../schema/user.schema";

export class CreateUserDTO {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsAlphanumeric()
    password: string;
}