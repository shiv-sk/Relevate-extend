import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class GenerateJdDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 1000)
  description: string;

  @ArrayMaxSize(20)
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  requiredSkills: string[];
}
