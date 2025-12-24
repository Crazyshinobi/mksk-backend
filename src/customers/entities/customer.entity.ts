import { Company } from 'src/companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  // ======================
  // USER TYPE / STATUS
  // ======================
  @Column({ name: 'is_borrower', default: false })
  isBorrower: boolean;

  @Column({ name: 'is_lender', default: false })
  isLender: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({name: 'lender_group',  nullable: true})
  lenderGroup: string;

  @Column({name: 'borrower_group',  nullable: true})
  borrowerGroup: string;

  // ======================
  // PERSONAL INFORMATION
  // ======================
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email_address', unique: true })
  emailAddress: string;

  @Column({ name: 'mobile_number' })
  mobileNumber: string;

  @Column({ name: 'alternate_mobile_number', nullable: true })
  alternateMobileNumber: string;

  @Column({ name: 'pan_number', nullable: true })
  panNumber: string;

  @Column({ name: 'aadhar_number', nullable: true })
  aadharNumber: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address: string;

  // ======================
  // COMPANY ASSOCIATION
  // ======================
  @ManyToOne(() => Company, { nullable: false })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  // ======================
  // BUSINESS DETAILS
  // ======================
  @Column({ name: 'business_name', nullable: true })
  businessName: string;

  @Column({ name: 'gst_number', nullable: true })
  gstNumber: string;

  @Column({ name: 'business_address', type: 'text', nullable: true })
  businessAddress: string;

  @Column({ name: 'nature_of_business', nullable: true })
  natureOfBusiness: string;

  @Column({ name: 'type_of_business', nullable: true })
  typeOfBusiness: string;

  @Column({ name: 'company_pan_number', nullable: true })
  companyPanNumber: string;

  // ======================
  // BANKING INFORMATION
  // ======================
  @Column({ name: 'bank_name', nullable: true })
  bankName: string;

  @Column({ name: 'account_number', nullable: true })
  accountNumber: string;

  @Column({ name: 'ifsc_code', nullable: true })
  ifscCode: string;

  @Column({ name: 'branch_name', nullable: true })
  branchName: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'account_holder_name', nullable: true })
  accountHolderName: string;

  // ======================
  // DOCUMENT PATHS (ONLY FILE PATHS)
  // ======================
  @Column({ name: 'pan_card_path', nullable: true })
  panCardPath: string;

  @Column({ name: 'aadhar_path', nullable: true })
  aadharPath: string;

  @Column({ name: 'company_pan_path', nullable: true })
  companyPanPath: string;

  @Column({ name: 'visiting_card_path', nullable: true })
  visitingCardPath: string;

  // ======================
  // TIMESTAMPS
  // ======================
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
