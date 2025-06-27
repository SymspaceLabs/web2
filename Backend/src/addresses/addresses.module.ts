import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import User from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService]
})
export class AddressesModule {}
