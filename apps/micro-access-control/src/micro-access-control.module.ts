import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      dbName: 'restaurant',
    }),
    OrganizationModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class MicroAccessControlModule {}
