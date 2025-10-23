import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { StoresModule } from './stores/stores.module';
import { PartnersModule } from './partners/partners.module';
import { PartnerStoresModule } from './partner-stores/partner-stores.module';
import { ReportsModule } from './reports/reports.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { FilesModule } from './files/files.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    BrandsModule,
    StoresModule,
    PartnersModule,
    PartnerStoresModule,
    ReportsModule,
    ReceiptsModule,
    FilesModule,
    DashboardModule
  ],
})
export class AppModule {}
