import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  company_id: number;

  @IsEnum(['S', 'M'])
  transaction_type: string;

  @IsEnum([1, 2])
  transaction_number_type: number;

  @IsDateString()
  transaction_date: string;

  @IsString()
  month: string;

  @IsNumber()
  amount_in_thousands: number;

  @IsString()
  a_p_status: string;

  @IsArray()
  @IsNumber({}, { each: true })
  lender_ids: number[]; 

  @IsArray()
  @IsNumber({}, { each: true })
  borrower_ids: number[];

  @IsNumber()
  @IsOptional()
  interest_recieved?: number;

  @IsNumber()
  @IsOptional()
  interest_paid?: number;

  @IsArray()
  comission_percentage: number[];

  @IsString()
  @IsOptional()
  remarks?: string;
}
