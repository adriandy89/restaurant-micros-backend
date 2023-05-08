import { IPermission } from '../interfaces/permission.interface';

export type Permissions = 'list' | 'create' | 'update' | 'delete';

export const PERMISSIONS: Permissions[] = [
  'list',
  'create',
  'update',
  'delete',
];

export const ALL_PERMISSIONS: IPermission = {
  administration: PERMISSIONS,
  products: PERMISSIONS,
};
