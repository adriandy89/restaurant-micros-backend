import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ORGANIZATION } from 'libs/common/models/models';
import { IOrganization } from 'libs/common/interfaces/organization.interface';
import { OrganizationDTO } from 'libs/common/dtos/organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(ORGANIZATION.name)
    private readonly model: Model<IOrganization>,
  ) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findByOrganizationname(organizationname: string) {
    return await this.model.findOne({ organizationname });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(organizationDTO: OrganizationDTO): Promise<IOrganization> {
    const newOrganization = new this.model({ ...organizationDTO });
    return await newOrganization.save();
  }

  async findAll(): Promise<IOrganization[]> {
    return await this.model.find().select('-password -createdA -__v').exec();
  }

  async findOne(id: string): Promise<IOrganization> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    organizationDTO: OrganizationDTO,
  ): Promise<IOrganization> {
    return await this.model.findByIdAndUpdate(id, organizationDTO);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
