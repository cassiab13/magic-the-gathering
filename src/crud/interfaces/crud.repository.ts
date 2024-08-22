import { UpdateUserDTO } from "../../users/dto/updateUserDTO";

export default interface ICrudRepository<T>{
    create(data: T): Promise<void>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}