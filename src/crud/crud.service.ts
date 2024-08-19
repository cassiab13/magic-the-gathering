import { Injectable, NotFoundException } from '@nestjs/common';
import ICrudService from './interfaces/crud.service';
import { CrudRepository } from './crud.repository';
import Adapter from '../common/adapter';


@Injectable()
export class CrudService<T, CreateDTO extends T, UpdateDTO extends T>
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
    const existingEntity = await this.repository.findById(id);
    const entity: T = this.adapter.updateToEntity(existingEntity, data);
    this.repository.update(id, data);
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