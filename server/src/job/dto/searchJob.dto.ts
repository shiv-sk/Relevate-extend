import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SearchJobDto {
  @IsNotEmpty()
  @Length(3, 200)
  @IsString()
  title: string;
}
