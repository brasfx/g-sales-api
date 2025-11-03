import { Injectable } from '@nestjs/common';
import { ICompanyRepository } from 'src/company/interface/company.repository.interface';
import { MongoCompanyRepository } from 'src/company/dbconectors/mongo-company.repository';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: MongoCompanyRepository) {}

  create(data: any) {
    return this.repository.create(data);
  }

  findById(companyId: string) {
    return this.repository.findById(companyId);
  }

  async findServicesByCompanyId(id: string) {
    const company = await this.repository.findById(id);
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company.services;
  }

  findAll() {
    return this.repository.findAll();
  }

  updateServices(companyId: string, services: any[]) {
    return this.repository.updateServices(companyId, services);
  }

  delete(companyId: string) {
    return this.repository.delete(companyId);
  }
}
