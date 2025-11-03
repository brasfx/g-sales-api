import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @IsNotEmpty()
  @IsString()
  fantasyName: string;

  @IsNotEmpty()
  @IsString()
  businessName: string;
}
