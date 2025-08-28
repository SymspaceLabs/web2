import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { MailchimpModule } from './mailchimp/mailchimp.module';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { SubcategoryItemsModule } from './subcategory-items/subcategory-items.module';
import { BlogsModule } from './blogs/blogs.module';
import { SeederModule } from './database/seeders/seeder.module';
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
import { SurveysModule } from './surveys/surveys.module';
import { FilesModule } from './files/files.module';
import { ProductVariantsModule } from './product-variant/product-variants.module';
import { AddressesModule } from './addresses/addresses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PaypalModule } from './paypal/paypal.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModelsModule } from './product-models/product-models.module';
import { PromoCodesModule } from './promo-codes/promo-codes.module';
import { UserPromoCodesModule } from './user-promo-codes/user-promo-codes.module';
import { BraintreeModule } from './braintree/braintree.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { SubcategoryItemChildModule } from './subcategory-item-child/subcategory-item-child.module';
import { S3Module } from './s3/s3.module';

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
        synchronize: false,
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
    ProductsModule,
    CompaniesModule,
    SubcategoriesModule,
    SubcategoryItemsModule,
    BlogsModule,
    SeederModule,
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
    SurveysModule,
    FilesModule,
    ProductVariantsModule,
    AddressesModule,
    ReviewsModule,
    PaypalModule,
    PaymentModule,
    ProductModelsModule,
    PromoCodesModule,
    UserPromoCodesModule,
    BraintreeModule,
    PaymentMethodsModule,
    SubcategoryItemChildModule,
    S3Module
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, MinioService],
})
export class AppModule {}
