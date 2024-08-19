export default interface ICrudService<T, CreateDTO, UpdateDTO>{
    create(data: CreateDTO): Promise<void>;
    update(id: string, data: UpdateDTO): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}