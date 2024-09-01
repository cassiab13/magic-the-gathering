import { Permission } from '../permissions/permissions.enum';

import { SetMetadata } from "@nestjs/common";

export const PERMISSION_KEY = 'permissions';
export const permission = (...permissions: { action: Permission; subject: string}[]) => SetMetadata(PERMISSION_KEY, permissions);

