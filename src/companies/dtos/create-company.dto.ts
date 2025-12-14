import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  companyName: string;

  @IsOptional()
  @IsString()
  companyDesc: string;
}
