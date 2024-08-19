export default interface Adapter<Entity, CreateDTO, UpdateDTO> {
    createToEntity(dto: CreateDTO): Entity;
  
    updateToEntity(existingEntity: Entity, dto: UpdateDTO): Entity;
}