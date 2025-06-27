import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import User from '../../src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Preference } from './entities/preference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Preference]),
    UsersModule,
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService],
  exports: [TypeOrmModule, PreferencesService],
  
})
export class PreferencesModule {}
