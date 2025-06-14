import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BeautyServiceModule } from './modules/beauty-service/beauty-service.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { AuthModule } from './modules/auth/auth.module';
import { DiscountModule } from './modules/discount/discount.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { NotificationModule } from './modules/notification/notification.module';
import { VatModule } from './modules/vat/vat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuditLogModule } from './modules/audit-log/audit-log.module';
import { PrismaService } from './core/prisma/prisma.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    PrismaModule,
    BeautyServiceModule,
    ProductModule,
    SaleModule,
    PaymentModule,
    UserModule,
    AppointmentModule,
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
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
