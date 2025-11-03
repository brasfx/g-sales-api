import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MongoCompanyRepository } from 'src/company/dbconectors/mongo-company.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,

    MongoCompanyRepository, // aqui você muda para DynamoCompanyRepository quando quiser
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
