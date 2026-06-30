import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { JobStatus } from 'commons/job.common';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsEnum(JobStatus)
  @IsNotEmpty()
  status: JobStatus;
}
