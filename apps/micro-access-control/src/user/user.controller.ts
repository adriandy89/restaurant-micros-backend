import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';
import { handleError } from 'libs/common/utils/error-handler-micro';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMsg.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO).catch((error) => {
      handleError(
        error.code === 11000
          ? { code: 409, message: 'Duplicate, already exist' }
          : undefined,
      );
    });
  }

  @MessagePattern(UserMsg.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMsg.FIND_ONE)
  async findOne(@Payload() id: string) {
    const found = await this.userService.findOne(id);
    if (!found) {
      handleError({ code: 404, message: 'Not Found' });
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
