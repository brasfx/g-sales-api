import { IsArray, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

class ServiceDto {
  name: string;
  description?: string;
  active: boolean;
}

export class UpdateServicesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];
}
