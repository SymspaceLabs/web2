import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingService } from './onboarding.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { MeasurementsModule } from '../measurements/measurements.module';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import { OnboardingController } from './onboarding.controller';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { Preference } from 'src/preferences/entities/preference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Measurement]),
    TypeOrmModule.forFeature([Preference]),
    UsersModule,
    MeasurementsModule,
    PreferencesModule
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}
