import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiProperty({ type: Boolean })
  @IsOptional()
  readonly active?: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly organization: string;
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  readonly roles: string[];
}
