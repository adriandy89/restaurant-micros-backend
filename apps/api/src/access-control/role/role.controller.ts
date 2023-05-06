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
import { RoleMsg } from 'libs/common/constants/rabbitmq.constants';
import { RoleDTO } from 'libs/common/dtos/role.dto';

@ApiTags('role')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyRole = this.clientProxy.clientProxyRoles();

  @Post()
  create(@Body() roleDTO: RoleDTO) {
    return this.clientProxyRole.send(RoleMsg.CREATE, roleDTO);
  }

  @Get()
  findAll() {
    return this.clientProxyRole.send(RoleMsg.FIND_ALL, '');
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: string) {
    return this.clientProxyRole.send(RoleMsg.FIND_ONE, id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({})
  update(@Param('id') id: string, @Body() roleDTO: Partial<RoleDTO>) {
    return this.clientProxyRole.send(RoleMsg.UPDATE, { id, roleDTO });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  delete(@Param('id') id) {
    return this.clientProxyRole.send(RoleMsg.DELETE, id);
  }
}
