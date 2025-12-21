import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsNumber,
  Length,
  Matches,
} from 'class-validator';

export class CreateCustomerDto {
  // ======================
  // Role Flags
  // ======================
  @Transform(({ value }) => {
    if (value === true || value === 'true' || value === 1 || value === '1') {
      return true;
    }
    if (value === false || value === 'false' || value === 0 || value === '0') {
      return false;
    }
    return value;
  })
  @IsBoolean()
  isBorrower: boolean;

  @Transform(({ value }) => {
    if (value === true || value === 'true' || value === 1 || value === '1') {
      return true;
    }
    if (value === false || value === 'false' || value === 0 || value === '0') {
      return false;
    }
    return value;
  })
  @IsBoolean()
  isLender: boolean;

  // ======================
  // Personal Information
  // ======================

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number' })
  mobileNumber: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  alternateMobileNumber?: string;

  @IsOptional()
  @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: 'Invalid PAN number',
  })
  panNumber?: string;

  @IsOptional()
  @Matches(/^\d{12}$/, {
    message: 'Aadhaar number must be 12 digits',
  })
  aadharNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  // ======================
  // Company Association
  // ======================
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  companyId: number;

  // ======================
  // Business Details
  // ======================

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
    message: 'Invalid GST number',
  })
  gstNumber?: string;

  @IsOptional()
  @IsString()
  businessAddress?: string;

  @IsOptional()
  @IsString()
  natureOfBusiness?: string;

  @IsOptional()
  @IsString()
  typeOfBusiness?: string;

  @IsOptional()
  @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: 'Invalid Company PAN number',
  })
  companyPanNumber?: string;

  // ======================
  // Banking Information
  // ======================

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @Matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
    message: 'Invalid IFSC code',
  })
  ifscCode?: string;

  @IsOptional()
  @IsString()
  branchName?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  accountHolderName?: string;

  // ======================
  // Documents (file paths)
  // ======================

  @IsOptional()
  @IsString()
  panCardDoc?: string;

  @IsOptional()
  @IsString()
  aadharDoc?: string;

  @IsOptional()
  @IsString()
  companyPanDoc?: string;

  @IsOptional()
  @IsString()
  visitingCardDoc?: string;
}
