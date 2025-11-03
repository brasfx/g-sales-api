import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/schemas/company.schema';
import { ICompanyRepository } from 'src/company/interface/company.repository.interface';

@Injectable()
export class MongoCompanyRepository implements ICompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(company: any) {
    const newCompany = new this.companyModel(company);
    return await newCompany.save();
  }

  async findById(companyId: string) {
    const company = await this.companyModel.findOne({ companyId });
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company;
  }

  async findAll() {
    return await this.companyModel.find().exec();
  }

  async updateServices(companyId: string, services: any[]) {
    const company = await this.companyModel.findOneAndUpdate(
      { companyId },
      { services: services },
      { new: true },
    );
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company;
  }

  async delete(companyId: string) {
    const result = await this.companyModel.findOneAndDelete({ companyId });
    if (!result) throw new NotFoundException('Empresa não encontrada');
    return { message: 'Empresa deletada com sucesso' };
  }
}
