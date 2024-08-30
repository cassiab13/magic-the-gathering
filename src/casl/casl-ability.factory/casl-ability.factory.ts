// import { Ability, AbilityBuilder, AbilityClass, CreateAbility, createMongoAbility, ExtractSubjectType, InferSubjects } from "@casl/ability";
// import { Injectable } from "@nestjs/common";
// import { Permission } from "src/permissions/permissions.enum";
// import { User } from "src/users/schema/user.schema";

// type Subjects = InferSubjects<typeof Permission | typeof User> | 'all';

// export type AppAbility = Ability<[Permission, Subjects]>;

// @Injectable()
// export class CaslAbilityFactory {
//   createForUser(user: User) {
//     const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

//     if (user.isAdmin) {
//       can(Permission.Manage, 'all');
//     } else {
//       can(Permission.Read, 'all'); 
//     }


//     return build({
//       detectSubjectType: (item) =>
//         item.constructor as ExtractSubjectType<Subjects>,
//     });
//   }
// }