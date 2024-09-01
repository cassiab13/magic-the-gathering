import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Actions, CaslAbilityFactory, Subjects } from '../casl/casl-ability.factory/casl-ability.factory';
import { Permission } from '../permissions/permissions.enum';
import { PERMISSION_KEY } from '../decorators/require.permission.decorators';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<{ action: Permission; subject: string }[]>(
      PERMISSION_KEY,
      context.getHandler(),
    );
    
    if (!permissions) {
      return true;
    }
    console.log('Permissions', permissions)
    const request = context.switchToHttp().getRequest();
    // console.log('Request', request);
    const user = request.user;
    const ability = this.caslAbilityFactory.createForUser(user);
    console.log('Ability', ability);

    return permissions.every((permission) => {
      const action = permission.action as Actions; 
      const subject = permission.subject as Subjects;

      return ability.can(action, subject);
    });
  }
}

