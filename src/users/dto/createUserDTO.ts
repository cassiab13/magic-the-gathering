import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "../../roles/roles.enum";
import { Permission } from "../../permissions/permissions.enum";


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
    
    @IsEnum(Role, { each: true })
    role: [Role];

    @IsEnum(Permission)
    permission: [Permission];
}