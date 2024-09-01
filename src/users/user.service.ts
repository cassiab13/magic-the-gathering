import { Injectable } from '@nestjs/common';
import { CrudService } from '../crud/crud.service';
import { CreateUserDTO } from './dto/createUserDTO';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { UpdateUserDTO } from './dto/updateUserDTO';
import UserAdapter from './user.adapter';
import { HashPassword } from '../common/password';

@Injectable()
export class UserService extends CrudService<
    User,
    CreateUserDTO,
    UpdateUserDTO
> {
    constructor(
        protected readonly userRepository: UserRepository,
        protected readonly adapter: UserAdapter
    ) {
        super(userRepository, adapter);
    }
    public async create(newUser: CreateUserDTO): Promise<void> {
            const verifyExistingUser: User | null = await this.validateUsernameOrEmail(newUser);
        
            if (verifyExistingUser) {
              throw new Error("Usuário já existe");
            }
        
        const user: User = this.adapter.createToEntity(newUser);
        console.log(user)
            user.password = await HashPassword.hashingPassword(user.password);
        await this.userRepository.create(user);
    }

    private async validateUsernameOrEmail(user: CreateUserDTO): Promise<User | null>{
        return this.userRepository.findByUsernameOrEmail(user.email, user.username);
    }

}
