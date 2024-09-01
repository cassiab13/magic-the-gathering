import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Permission } from "../../permissions/permissions.enum";
import { User } from "../../users/schema/user.schema";
import { Role } from "src/roles/roles.enum";

export type Subjects = InferSubjects<typeof Permission | typeof User> | 'all' | 'Deck';
export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type AppAbility = MongoAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    console.log('User em Casl', user);

    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
    
    // Assumindo que user.roles e user.permissions são arrays de strings
    console.log('Roles em Casl', user.role);
    
    if (user.role.includes(Role.ADMIN)) {
      can('manage', 'all');
    } else {
      can('read', 'all');
      if (user.permission.includes(Permission.Create)) {
        can('create', 'all');
      }
    }

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<typeof item>,
    });
  }
}