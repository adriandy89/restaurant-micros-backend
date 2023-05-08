import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '@app/libs/common/models/db.model';
import { IUser } from '@app/libs/common/interfaces/user.interface';
import { UserDTO } from '@app/libs/common/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findByUsername(username: string) {
    return await this.model
      .findOne({ username })
      .populate({
        path: 'role',
        select: 'permissions _id',
      })
      .exec();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model
      .find()
      .select('-password -createdA -__v')
      .populate({
        path: 'role',
        select: 'permissions -_id',
      })
      .exec();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    if (!!userDTO.password) {
      const hash = await this.hashPassword(userDTO.password);
      const user = { ...userDTO, password: hash };
      return await this.model.findByIdAndUpdate(id, user);
    }
    return await this.model.findByIdAndUpdate(id, userDTO);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
