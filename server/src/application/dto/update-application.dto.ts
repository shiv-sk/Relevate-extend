import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplicationStatus } from 'commons/application.common';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsEnum(ApplicationStatus)
  @IsNotEmpty()
  status: ApplicationStatus;
}
