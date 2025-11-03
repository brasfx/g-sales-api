import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateServicesDto } from './dto/update-services.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() dto: CreateCompanyDto) {
    const company = await this.companyService.create(dto);
    return {
      success: true,
      message: 'Empresa criada com sucesso!',
      data: company,
    };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const company = await this.companyService.findById(id);
    return { data: company };
  }

  @Get('services/:id')
  findServices(@Param('id') id: string) {
    return this.companyService.findServicesByCompanyId(id);
  }

  @Get()
  async findAll() {
    const companies = await this.companyService.findAll();
    return { data: companies };
  }

  @Patch(':id')
  async updateServices(
    @Param('id') id: string,
    @Body() dto: UpdateServicesDto,
  ) {
    const company = await this.companyService.updateServices(id, dto.services);
    return { success: true, message: 'Serviços atualizados!', data: company };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const company = await this.companyService.delete(id);
    return {
      success: true,
      message: 'Serviço removido com sucesso!',
      data: id,
    };
  }
}
