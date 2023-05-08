import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ROLE } from '@app/libs/common/models/models';
import { IRole } from '@app/libs/common/interfaces/role.interface';
import { RoleDTO } from '@app/libs/common/dtos/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(ROLE.name)
    private readonly model: Model<IRole>,
  ) {}

  async findByRolename(rolename: string) {
    return await this.model.findOne({ rolename });
  }

  async create(roleDTO: RoleDTO): Promise<IRole> {
    const newRole = new this.model({ ...roleDTO });
    return await newRole.save();
  }

  async findAll(): Promise<IRole[]> {
    return await this.model.find().select('-password -createdA -__v').exec();
  }

  async findOne(id: string): Promise<IRole> {
    return await this.model.findById(id);
  }

  async update(id: string, roleDTO: RoleDTO): Promise<IRole> {
    return await this.model.findByIdAndUpdate(id, roleDTO);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
