import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';

class SocialMedia {
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name: string;

  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsNotEmpty()
  link: string;
}
export class CreateCompanyDto {
  @IsNotEmpty()
  @Length(3, 200)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  officialEmail: string;

  @IsNotEmpty()
  @Length(3, 2000)
  @IsString()
  about: string;

  @IsNotEmpty()
  @Length(3, 200)
  @IsString()
  domain: string;

  @IsNotEmpty()
  @Length(3, 200)
  @IsString()
  size: string;

  @IsNotEmpty()
  @Length(3, 2000)
  @IsString()
  location: string;

  @ArrayMaxSize(7)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMedia)
  @IsOptional()
  socialMedia?: SocialMedia[];
}
