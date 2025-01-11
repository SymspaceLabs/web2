import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotentialUsersService } from './potential-users.service';
import { PotentialUsersController } from './potential-users.controller';
import { PotentialUser } from './entities/potential-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PotentialUser])],
  providers: [PotentialUsersService],
  controllers: [PotentialUsersController],
})
export class PotentialUsersModule {}
