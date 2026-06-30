import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { JobLevel, JobLocation, JobType } from 'commons/job.common';
export class CreateJobDto {
  @IsNotEmpty()
  @Length(3, 200)
  @IsString()
  title: string;

  @IsNotEmpty()
  @Length(3, 6000)
  @IsString()
  description: string;

  @IsNotEmpty()
  @Length(3, 200)
  @IsString()
  salary: string;

  @IsEnum(JobLevel)
  level: JobLevel;

  @IsEnum(JobType)
  type: JobType;

  @IsEnum(JobLocation)
  location: JobLocation;

  @ArrayMaxSize(20)
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  requiredSkills: string[];
}
