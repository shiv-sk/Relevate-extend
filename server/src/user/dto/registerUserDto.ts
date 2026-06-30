import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRole } from 'commons/userRoles.common';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 200)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 200)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
