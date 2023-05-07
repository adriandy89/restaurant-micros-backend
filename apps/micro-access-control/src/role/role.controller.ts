import { RoleService } from './role.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleMsg } from 'libs/common/constants/rabbitmq.constants';
import { RoleDTO } from 'libs/common/dtos/role.dto';
import { handleError } from 'libs/common/utils/error-handler-micro';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(RoleMsg.CREATE)
  create(@Payload() roleDTO: RoleDTO) {
    return this.roleService.create(roleDTO).catch((error) => {
      handleError(
        error.code === 11000
          ? { code: 409, message: 'Duplicate, already exist' }
          : undefined,
      );
    });
  }

  @MessagePattern(RoleMsg.FIND_ALL)
  findAll() {
    return this.roleService.findAll();
  }

  @MessagePattern(RoleMsg.FIND_ONE)
  async findOne(@Payload() id: string) {
    const found = await this.roleService.findOne(id);
    if (!found) {
      handleError({ code: 404, message: 'Not Found' });
    }
    return found;
  }

  @MessagePattern(RoleMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.roleService.update(payload.id, payload.roleDTO);
  }

  @MessagePattern(RoleMsg.DELETE)
  delete(@Payload() id: string) {
    return this.roleService.delete(id);
  }
}
