// get-cashbook-query.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer'; // Ensure this is installed

export class GetCashbookQueryDto {
  @IsOptional()
  @IsString() // Changed from IsNumberString to allow initial empty loads
  companyId?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}