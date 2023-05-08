import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { USER } from '@app/libs/common/models/db.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
