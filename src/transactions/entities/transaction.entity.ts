import { Company } from 'src/companies/entities/company.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, { nullable: false })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'enum', enum: ['S', 'M'] })
  transaction_type: string;

  @Column({ type: 'enum', enum: [1, 2] })
  transaction_number_type: number;

  @Column({ type: 'date' })
  transaction_date: Date;

  @Column()
  month: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount_in_thousands: number;

  @Column({ type: 'enum', enum: ['advanced', 'past'] })
  a_p_status: string;

  @ManyToMany(() => Customer)
  @JoinTable({
    name: 'transaction_lenders', 
    joinColumn: { name: 'transaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'customer_id', referencedColumnName: 'id' },
  })
  lenders: Customer[];

  @ManyToMany(() => Customer)
  @JoinTable({
    name: 'transaction_borrowers',
    joinColumn: { name: 'transaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'customer_id', referencedColumnName: 'id' },
  })
  borrowers: Customer[];

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  interest_recieved: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  interest_paid: number;

  @Column({ type: 'json' })
  comission_percentage: number[];

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
