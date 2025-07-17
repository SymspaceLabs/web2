import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailchimpModule } from '../mailchimp/mailchimp.module';
import { Company } from 'src/companies/entities/company.entity';
import { JwtStrategy } from './jwt.strategy'; // Import your JwtStrategy

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 1500,
          },
        };
      },
    }),
    UsersModule,
    // AuthModule is importing itself, which is usually not intended.
    // If AuthModule needs to be available to other modules, it should be exported,
    // but not imported by itself unless there's a specific forwardRef use case.
    // Assuming this was a copy-paste error or a misunderstanding, I'm commenting it out.
    // If it's intentional (e.g., for circular dependency with forwardRef), ensure it's correct.
    // AuthModule,
    MailchimpModule,
    TypeOrmModule.forFeature([User, Company, Auth]), // Include Company entity here
    HttpModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [AuthService, PassportModule, RedisModule],
})
export class AuthModule {}
