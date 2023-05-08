import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleMsg } from '@app/libs/common/constants/rabbitmq.constants';
import { RoleDTO } from '@app/libs/common/dtos/role.dto';
import { Permissions } from '../auth/decorators/permission.decorator';
import { PermissionsGuard } from '../auth/guards/permission.guard';

@ApiTags('role')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyAccessControl =
    this.clientProxy.clientProxyAccessControl();

  @Post()
  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  create(@Body() roleDTO: RoleDTO) {
    return this.clientProxyAccessControl.send(RoleMsg.CREATE, roleDTO);
  }

  @Get()
  findAll() {
    return this.clientProxyAccessControl.send(RoleMsg.FIND_ALL, '');
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  findOne(@Param('id') id: string) {
    return this.clientProxyAccessControl.send(RoleMsg.FIND_ONE, id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({})
  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  update(@Param('id') id: string, @Body() roleDTO: Partial<RoleDTO>) {
    return this.clientProxyAccessControl.send(RoleMsg.UPDATE, { id, roleDTO });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  delete(@Param('id') id) {
    return this.clientProxyAccessControl.send(RoleMsg.DELETE, id);
  }
}
