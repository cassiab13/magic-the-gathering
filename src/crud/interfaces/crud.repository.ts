export default interface ICrudRepository<T>{
    create(data: T): Promise<void>;
    update(id: string, data: T): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}