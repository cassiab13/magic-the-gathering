import { Permission } from '../permissions/permissions.enum';

import { SetMetadata } from "@nestjs/common";

export const PERMISSION_KEY = 'permissions';
export const permission = (...permissions: Permission[]) => SetMetadata(PERMISSION_KEY, permissions);

