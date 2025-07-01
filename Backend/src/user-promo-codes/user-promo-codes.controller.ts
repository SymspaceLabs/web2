import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPromoCodesService } from './user-promo-codes.service';
import { CreateUserPromoCodeDto } from './dto/create-user-promo-code.dto';
import { UpdateUserPromoCodeDto } from './dto/update-user-promo-code.dto';

@Controller('user-promo-codes')
export class UserPromoCodesController {
  constructor(private readonly userPromoCodesService: UserPromoCodesService) {}

  @Post()
  create(@Body() createUserPromoCodeDto: CreateUserPromoCodeDto) {
    return this.userPromoCodesService.create(createUserPromoCodeDto);
  }

  @Get()
  findAll() {
    return this.userPromoCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPromoCodesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPromoCodeDto: UpdateUserPromoCodeDto) {
    return this.userPromoCodesService.update(id, updateUserPromoCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPromoCodesService.remove(id);
  }
}
