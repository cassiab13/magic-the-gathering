import { Model, UpdateQuery } from 'mongoose';
import ICrudRepository from './interfaces/crud.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CrudRepository<T> implements ICrudRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }

  public async create(data: T): Promise<void> {
    await this.model.create(data);
  }

  public async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  
  public async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}