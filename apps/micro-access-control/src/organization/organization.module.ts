import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationSchema } from './schema/organization.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationController } from './organization.controller';
import { ORGANIZATION } from '@app/libs/common/models/models';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ORGANIZATION.name,
        useFactory: () => OrganizationSchema,
      },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
