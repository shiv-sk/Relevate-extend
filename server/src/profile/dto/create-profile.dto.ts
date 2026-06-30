import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class ExperienceDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  noticePeriod?: string;

  @IsOptional()
  years?: number;
}

class EducationDto {
  @IsNotEmpty()
  @IsString()
  institute: string;

  @IsNotEmpty()
  @IsString()
  degree: string;

  @IsNotEmpty()
  passoutYear: number;
}

class ProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  links?: {
    github?: string;
    live?: string;
    demo?: string;
    article?: string;
  };
}

class SocialMedia {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  link?: string;
}

export class CreateProfileDto {
  @Length(3, 200)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 2000)
  bio: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  currentLocation: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 2000)
  lookingFor: string;

  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  skills: string[];

  @IsArray()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @IsOptional()
  education: EducationDto[];

  @IsArray()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  @IsOptional()
  projects: ProjectDto[];

  @IsArray()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  @IsOptional()
  experience: ExperienceDto[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => SocialMedia)
  socialMedia: SocialMedia[];
}
