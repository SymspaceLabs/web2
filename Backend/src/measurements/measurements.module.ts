import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { MeasurementsController } from './measurements.controller';
import { MeasurementsService } from './measurements.service';
import User from '../users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Measurement]),
    UsersModule,
  ],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
  exports: [TypeOrmModule, MeasurementsService],
})
export class MeasurementsModule {}
