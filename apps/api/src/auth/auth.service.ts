import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { UserDTO } from '../user/dto/user.dto';
import { firstValueFrom } from 'rxjs';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyAPI,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();
  async validateUser(username: string, password: string): Promise<any> {
    const r = this._clientProxyUser.send(UserMsg.VALID_USER, {
      username,
      password,
    });
    const user = await firstValueFrom(r);

    if (user) return user;

    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(userDTO: UserDTO) {
    return await this._clientProxyUser
      .send(UserMsg.CREATE, userDTO)
      .toPromise();
  }
}
