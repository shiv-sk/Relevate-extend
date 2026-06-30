import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  Availability,
  Experience,
  PreferredLocation,
  SalaryExcepted,
} from 'commons/application.common';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  jobId: string;

  @IsEnum(SalaryExcepted)
  salaryExcepted: SalaryExcepted;

  @IsEnum(Availability)
  availability: Availability;

  @IsEnum(PreferredLocation)
  preferredLocation: PreferredLocation;

  @IsEnum(Experience)
  experience: Experience;
}
