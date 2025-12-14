import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Get()
  @ResponseMessage('Companies fetched successfully')
  findAll() {
    return this.companiesService.findAll();
  }

  @Post()
  @ResponseMessage('Company created successfully')
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }
}
