import {
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Controller,
    UseGuards,
  } from '@nestjs/common';

  import ICrudController from './interfaces/crud.controller';
import { CrudService } from './crud.service';

  @Controller()
  export class CrudController<T, CreateDTO extends T, UpdateDTO extends T>
    implements ICrudController<T, CreateDTO, UpdateDTO>
  {
    constructor(
      protected readonly service: CrudService<T, CreateDTO, UpdateDTO>,
    ) {}
  
    @Post()
    create(@Body() body: CreateDTO): Promise<void> {
      return this.service.create(body);
    }
  
    @Get()
    async findAll(): Promise<T[]> {
      return this.service.findAll();
    }
  
    @Get(':id')
    async findById(@Param('id') id: string): Promise<T> {
      return await this.service.findById(id);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() update: UpdateDTO,
    ): Promise<void> {
      this.service.update(id, update);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
      this.service.delete(id);
    }
  }