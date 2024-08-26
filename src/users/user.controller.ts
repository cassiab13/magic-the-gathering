import { UserService } from './user.service';
import { CrudController } from "../crud/crud.controller";
import { CreateUserDTO } from "./dto/createUserDTO";
import { UpdateUserDTO } from "./dto/updateUserDTO";
import { User } from "./schema/user.schema";
import { Body, Controller, Delete, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';


@Controller('users')
export class UserController extends CrudController<
    User,
    CreateUserDTO,
    UpdateUserDTO
    >{
    constructor(protected readonly userService: UserService) {
        super(userService);
    }

    @Post()
    // @UseGuards(AuthGuard)
    async create(@Body() createUserDTO: CreateUserDTO): Promise<void>{
        await this.userService.create(createUserDTO);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO): Promise<void>{
        await this.userService.update(id, updateUserDTO);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string): Promise<void> { 
        await this.userService.delete(id);
    }
}