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
import { PermissionDTO } from './dto/permission.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionMsg } from 'libs/common/constants/rabbitmq.constants';

@ApiTags('permission')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('permission')
export class PermissionController {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyPermission = this.clientProxy.clientProxyPermissions();

  @Post()
  create(@Body() permissionDTO: PermissionDTO) {
    return this.clientProxyPermission.send(PermissionMsg.CREATE, permissionDTO);
  }

  @Get()
  findAll() {
    return this.clientProxyPermission.send(PermissionMsg.FIND_ALL, '');
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: string) {
    return this.clientProxyPermission.send(PermissionMsg.FIND_ONE, id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({})
  update(
    @Param('id') id: string,
    @Body() permissionDTO: Partial<PermissionDTO>,
  ) {
    return this.clientProxyPermission.send(PermissionMsg.UPDATE, {
      id,
      permissionDTO,
    });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  delete(@Param('id') id) {
    return this.clientProxyPermission.send(PermissionMsg.DELETE, id);
  }
}
