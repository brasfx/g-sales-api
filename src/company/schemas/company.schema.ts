import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true, unique: true })
  companyId: string;

  @Prop({ required: false })
  fantasyName: string;

  @Prop({ required: false })
  businessName: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        description: { type: String, required: false },
        active: { type: Boolean, default: true },
      },
    ],
    default: [],
  })
  services: {
    name: string;
    description?: string;
    active: boolean;
  }[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
