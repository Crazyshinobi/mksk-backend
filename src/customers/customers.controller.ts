import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { customerDocumentsStorage } from './multer/customer-documents.multer';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ResponseMessage('Customers fetched successfully')
  findAll() {
    return this.customersService.findAll();
  }

  @Post()
  @ResponseMessage('Customer created successfully')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'panCard', maxCount: 1 },
        { name: 'aadhar', maxCount: 1 },
        { name: 'companyPan', maxCount: 1 },
        { name: 'visitingCard', maxCount: 1 },
      ],
      { storage: customerDocumentsStorage },
    ),
  )
  createCustomer(
    @Body() dto: CreateCustomerDto,
    @UploadedFiles()
    files: {
      panCard?: Express.Multer.File[];
      aadhar?: Express.Multer.File[];
      companyPan?: Express.Multer.File[];
      visitingCard?: Express.Multer.File[];
    },
  ) {
    return this.customersService.createCustomer(dto, files);
  }
}
