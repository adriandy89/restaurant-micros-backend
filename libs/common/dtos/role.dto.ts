import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RoleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly organization: string;
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  readonly permissions: string[];
}
