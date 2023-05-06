import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMsg.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @MessagePattern(UserMsg.FIND_ALL)
  findAll() {
    console.log('from user');
    return this.userService.findAll();
  }

  @MessagePattern(UserMsg.FIND_ONE)
  async findOne(@Payload() id: string) {
    const found = await this.userService.findOne(id);
    if (!found) {
      console.log('RpcException...');
      throw new RpcException({ code: 404, message: 'Not Found' });
    }
    return found;
  }
  @MessagePattern(UserMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDTO);
  }

  @MessagePattern(UserMsg.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern(UserMsg.VALID_USER)
  async validateUser(@Payload() payload) {
    const user = await this.userService.findByUsername(payload.username);

    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    if (user && isValidPassword) return user;

    return null;
  }
}
