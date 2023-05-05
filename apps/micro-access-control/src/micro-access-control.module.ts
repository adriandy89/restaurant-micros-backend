import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot({
    //   uri: 'mongodb://localhost:27017',
    //   auth: { username: 'app_user', password: 'app_password' },
    //   dbName: 'restaurant',
    // }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      dbName: 'restaurant',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class MicroAccessControlModule {}
