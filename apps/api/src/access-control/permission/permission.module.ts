import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PermissionController],
  providers: [],
})
export class PermissionModule {}
