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
import { UserDTO } from './dto/user.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() userDTO: UserDTO) {
    return this.clientProxyUser.send(UserMsg.CREATE, userDTO);
  }

  @Get()
  findAll() {
    return this.clientProxyUser.send(UserMsg.FIND_ALL, '');
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: string) {
    return this.clientProxyUser.send(UserMsg.FIND_ONE, id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({})
  update(@Param('id') id: string, @Body() userDTO: Partial<UserDTO>) {
    return this.clientProxyUser.send(UserMsg.UPDATE, { id, userDTO });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  delete(@Param('id') id) {
    return this.clientProxyUser.send(UserMsg.DELETE, id);
  }
}
