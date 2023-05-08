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
import { UserMsg } from '@app/libs/common/constants/rabbitmq.constants';
import { UserDTO } from '@app/libs/common/dtos/user.dto';
import { Permissions } from '../auth/decorators/permission.decorator';
import { PermissionsGuard } from '../auth/guards/permission.guard';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyAccessControl =
    this.clientProxy.clientProxyAccessControl();

  @Post()
  create(@Body() userDTO: UserDTO) {
    return this.clientProxyAccessControl.send(UserMsg.CREATE, userDTO);
  }

  @Get()
  @Permissions({ administration: ['create', 'list'], products: ['list'] })
  @UseGuards(PermissionsGuard)
  findAll() {
    return this.clientProxyAccessControl.send(UserMsg.FIND_ALL, '');
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: string) {
    return this.clientProxyAccessControl.send(UserMsg.FIND_ONE, id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({})
  update(@Param('id') id: string, @Body() userDTO: Partial<UserDTO>) {
    return this.clientProxyAccessControl.send(UserMsg.UPDATE, { id, userDTO });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  delete(@Param('id') id) {
    return this.clientProxyAccessControl.send(UserMsg.DELETE, id);
  }
}
