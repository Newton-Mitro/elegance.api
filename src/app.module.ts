import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { SeedModule } from './seed/seed.module';
import { BeautyServiceModule } from './modules/beauty-service/beauty-service.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ServiceCategoryModule } from './modules/service-category/service-category.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { AuthModule } from './modules/auth/auth.module';
import { DiscountModule } from './modules/discount/discount.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { VatModule } from './modules/vat/vat.module';
import { PrismaService } from './prisma/prisma.service';
import { SeederService } from './seed/seeder.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuditLogModule } from './modules/audit-log/audit-log.module';

@Module({
  imports: [
    PrismaModule,
    SeedModule,
    BeautyServiceModule,
    ProductModule,
    SaleModule,
    PaymentModule,
    UserModule,
    AppointmentModule,
    ServiceCategoryModule,
    ProductCategoryModule,
    DiscountModule,
    LoyaltyModule,
    AuthModule,
    NotificationModule,
    VatModule,
    InvoiceModule,
    AccountingModule,
    AuditLogModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development.local', '.env.production'],
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, SeederService],
})
export class AppModule {}
