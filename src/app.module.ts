import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna acessível em toda a aplicação
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', ''), // define valor padrão vazio
        dbName: 'sales_api',
      }),
      inject: [ConfigService],
    }),
    CompanyModule,
    AuthModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
