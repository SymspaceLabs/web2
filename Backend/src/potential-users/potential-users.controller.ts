import { Controller, Get, Post, Body } from '@nestjs/common';
import { PotentialUsersService } from './potential-users.service';

@Controller('potential-users')
export class PotentialUsersController {
  constructor(private readonly potentialUsersService: PotentialUsersService) {}

  @Post()
  async addPotentialUser(@Body('email') email: string) {
    return this.potentialUsersService.create(email);
  }

  @Get()
  findAll() {
    return this.potentialUsersService.findAll();
  }

}
