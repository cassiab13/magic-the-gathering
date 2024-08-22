import { Injectable, NotFoundException } from '@nestjs/common';
import ICrudService from './interfaces/crud.service';
import { CrudRepository } from './crud.repository';
import Adapter from '../common/adapter';
import { UpdateUserDTO } from '../users/dto/updateUserDTO';
import { UpdateQuery } from 'mongoose';


@Injectable()
export class CrudService<T extends UpdateUserDTO, CreateDTO extends T, UpdateDTO extends Partial<T>>
  implements ICrudService<T, CreateDTO, UpdateDTO>
{
  constructor(
    protected readonly repository: CrudRepository<T>,
    protected readonly adapter: Adapter<T, CreateDTO, UpdateDTO>
  ) {}

  public async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  public async findById(id: string): Promise<T> {
    return this.find(id);
  }

  public async create(data: CreateDTO): Promise<void> {
    const entity: T = this.adapter.createToEntity(data)
    this.repository.create(entity);
  }

  public async update(id: string, data: UpdateDTO): Promise<void> {    
    const updateData: UpdateQuery<T> = this.adapter.updateToEntity({} as T, data);
    const updatedEntity = await this.repository.update(id, updateData);

    if (!updatedEntity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }

  public async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  protected async find(id: string): Promise<T> {
    const entity: T = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity ${id} not found.`);
    }

    return entity;
  }
}