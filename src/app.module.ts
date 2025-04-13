import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SeederService } from './seed/seeder.service';
import { PrismaModule } from './prisma/prisma.module';
import { SeedModule } from './seed/seed.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { VatModule } from './modules/vat/vat.module';
import { NotificationModule } from './modules/notification/notification.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { DiscountModule } from './modules/discount/discount.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ServiceCategoryModule } from './modules/service-category/service-category.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { UserModule } from './modules/user/user.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SaleModule } from './modules/sale/sale.module';
import { ProductModule } from './modules/product/product.module';
import { BeautyServiceModule } from './modules/beauty-service/beauty-service.module';
import { AccountingModule } from './accounting/accounting.module';
import { UsersController } from './users/users.controller';
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
  ],
  controllers: [AppController, UsersController],
  providers: [PrismaService, SeederService],
})
export class AppModule {}
