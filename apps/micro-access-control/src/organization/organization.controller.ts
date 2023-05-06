import { OrganizationService } from './organization.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationMsg } from 'libs/common/constants/rabbitmq.constants';
import { OrganizationDTO } from 'libs/common/dtos/organization.dto';

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @MessagePattern(OrganizationMsg.CREATE)
  create(@Payload() organizationDTO: OrganizationDTO) {
    return this.organizationService.create(organizationDTO);
  }

  @MessagePattern(OrganizationMsg.FIND_ALL)
  findAll() {
    console.log('from organization');
    return this.organizationService.findAll();
  }

  @MessagePattern(OrganizationMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.organizationService.findOne(id);
  }
  @MessagePattern(OrganizationMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.organizationService.update(payload.id, payload.organizationDTO);
  }

  @MessagePattern(OrganizationMsg.DELETE)
  delete(@Payload() id: string) {
    return this.organizationService.delete(id);
  }
}
