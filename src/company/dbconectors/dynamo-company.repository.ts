import { Injectable, NotFoundException } from '@nestjs/common';
import * as dynamoose from 'dynamoose';
import { ICompanyRepository } from 'src/company/interface/company.repository.interface';

const CompanySchema = new dynamoose.Schema({
  companyId: { type: String, hashKey: true },
  fantasyName: String,
  businessName: String,
  services: { type: Array, schema: [Object], default: [] },
});

const CompanyModel = dynamoose.model('Company', CompanySchema);

@Injectable()
export class DynamoCompanyRepository implements ICompanyRepository {
  async create(company: any) {
    return await CompanyModel.create(company);
  }

  async findById(companyId: string) {
    const company = await CompanyModel.get(companyId);
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company;
  }

  async updateServices(companyId: string, services: any[]) {
    const company = await CompanyModel.update(
      { companyId },
      { servicos: services },
    );
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company;
  }

  async delete(companyId: string) {
    const company = await CompanyModel.delete(companyId);
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return { message: 'Empresa deletada com sucesso' };
  }
}
