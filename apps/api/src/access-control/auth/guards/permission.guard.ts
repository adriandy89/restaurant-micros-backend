import { IPermission } from '@app/libs/common/interfaces/permission.interface';
import { IRole } from '@app/libs/common/interfaces/role.interface';
import { IUser } from '@app/libs/common/interfaces/user.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // const perm_req = {
    //   administration: ['create', 'list'],
    //   products: ['list', 'update', 'delete'],
    // };
    // const perm_user = {
    //   administration: ['create', 'list'],
    //   products: ['list', 'update'],
    // };
    // console.log(this.compareObjectProperties(perm_req, perm_user)); // true
    //console.log(this.compareObjectProperties(perm_user, perm_req)); // false (missing element 'edit')

    const requiredPermissions = this.reflector.get<IPermission>(
      'permissions',
      context.getHandler(),
    );
    console.log({ requiredPermissions });
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.permissions) {
      return false;
    }
    const userPermissions: IPermission = user.permissions;
    console.log({ userPermissions });

    return this.compareObjectProperties(requiredPermissions, userPermissions);
    // requiredPermissions.every((permission) =>
    //   permissions.includes(permission),
    // );
  }

  compareObjectProperties(
    obj1: Partial<IPermission>,
    obj2: Partial<IPermission>,
  ): boolean {
    for (const key1 in obj1) {
      if (obj2.hasOwnProperty(key1)) {
        const arr1 = obj1[key1];
        const arr2 = obj2[key1];
        for (const element1 of arr1) {
          if (!arr2.includes(element1)) {
            return false;
          }
        }
      } else {
        return false;
      }
    }
    return true;
  }
}
