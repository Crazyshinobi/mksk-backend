import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { Company } from '../companies/entities/company.entity';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCustomer(
    dto: CreateCustomerDto,
    files: {
      panCard?: Express.Multer.File[];
      aadhar?: Express.Multer.File[];
      companyPan?: Express.Multer.File[];
      visitingCard?: Express.Multer.File[];
    },
  ): Promise<Customer> {
    if (!dto.isBorrower && !dto.isLender) {
      throw new BadRequestException('Customer must be borrower or lender');
    }

    const company = await this.companyRepository.findOne({
      where: { id: dto.companyId },
    });
    if (!company) {
      throw new NotFoundException('Associated company not found');
    }

    const existingCustomer = await this.customerRepository.findOne({
      where: [
        { emailAddress: dto.emailAddress },
        { mobileNumber: dto.mobileNumber },
      ],
    });

    if (existingCustomer) {
      throw new ConflictException(
        'Customer with email or mobile already exists',
      );
    }

    const customerData: Partial<Customer> = {
      ...dto,
      company: company,
      isActive: true,
      panCardPath: files?.panCard?.[0]?.path,
      aadharPath: files?.aadhar?.[0]?.path,
      companyPanPath: files?.companyPan?.[0]?.path,
      visitingCardPath: files?.visitingCard?.[0]?.path,
    };

    const customer = this.customerRepository.create(customerData);

    // 3. Save and return
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: ['company'],
    });
  }

  async toggleStatus(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    customer.isActive = !customer.isActive;

    return await this.customerRepository.save(customer);
  }

  async updateStatus(id: number, status: boolean): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    customer.isActive = status;
    return await this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<{ message: string }> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const filePaths = [
      customer.panCardPath,
      customer.aadharPath,
      customer.companyPanPath,
      customer.visitingCardPath,
    ];

    for (const path of filePaths) {
      if (path) {
        const absolutePath = join(process.cwd(), path);

        try {
          if (existsSync(absolutePath)) {
            await unlink(absolutePath);
            console.log(`Successfully deleted file: ${absolutePath}`);
          }
        } catch (err) {
          console.error(
            `Failed to delete file at ${absolutePath}:`,
            err.message,
          );
        }
      }
    }

    await this.customerRepository.remove(customer);

    return {
      message: 'Customer and associated documents deleted successfully',
    };
  }
}
