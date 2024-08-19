import Adapter from '../common/adapter';
import { CreateUserDTO } from './dto/createUserDTO';
import { UpdateUserDTO } from './dto/updateUserDTO';
import { User } from './schema/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserAdapter
  implements Adapter<User, CreateUserDTO, UpdateUserDTO>
{
  public updateToEntity(existingUser: User, dto: UpdateUserDTO): User {
    return {
      ...existingUser,
      ...dto
    } as User;
  }

  public createToEntity(dto: CreateUserDTO): User {
    return {
      email: dto.email,
      username: dto.username,
      password: dto.password,
    } as User;
  }
}