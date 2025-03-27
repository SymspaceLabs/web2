import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { MailchimpModule } from './mailchimp/mailchimp.module';
import { EmailModule } from './email/email.module';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { SubcategoryItemsModule } from './subcategory-items/subcategory-items.module';
import { BlogsModule } from './blogs/blogs.module';
import { SeederModule } from './database/seeders/seeder.module';
import { StockModule } from './stock/stock.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MinioService } from './minio/minio.service';
import { UploadController } from './upload/upload.controller';
import { ProductColorsModule } from './product-colors/product-colors.module';
import { Product3dModelsModule } from './product-3d-models/product-3d-models.module';
import { ProductSizesModule } from './product-sizes/product-sizes.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PotentialUsersModule } from './potential-users/potential-users.module';
import { JobsModule } from './jobs/jobs.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { ResumesModule } from './resumes/resumes.module';
import { UploadModule } from './upload/upload.module';
import { SellerOnboardingModule } from './seller-onboarding/seller-onboarding.module';
import { BanksModule } from './banks/banks.module';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { BillingAddressesModule } from './billing-addresses/billing-addresses.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('HOST_DB') || 'localhost',
        port: parseInt(configService.get<string>('HOST_DB_PORT')) || 3306 ,
        username: configService.get<string>('DB_UNAME') || 'root',
        password: configService.get<string>('DB_UPASS') || '1234',
        database: configService.get<string>('DB_NAME')  || 'sympspace', 
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      }),
    }),
    UsersModule,
    CategoriesModule,
    OrdersModule,
    AuthModule,
    MailchimpModule,
    EmailModule,
    ProductsModule,
    CompaniesModule,
    SubcategoriesModule,
    SubcategoryItemsModule,
    BlogsModule,
    SeederModule,
    StockModule,
    ProductImagesModule,
    RedisModule,
    ProductColorsModule,
    Product3dModelsModule,
    ProductSizesModule,
    MeasurementsModule,
    OnboardingModule,
    PreferencesModule,
    PotentialUsersModule,
    JobsModule,
    ContactUsModule,
    JobApplicationsModule,
    ResumesModule,
    UploadModule,
    SellerOnboardingModule,
    BanksModule,
    CreditCardsModule,
    BillingAddressesModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, MinioService],
})
export class AppModule {}
