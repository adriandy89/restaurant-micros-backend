import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleSchema } from './schema/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { ROLE } from '@app/libs/common/models/db.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ROLE.name,
        useFactory: () => RoleSchema,
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
