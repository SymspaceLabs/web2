import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerOnboardingService } from './seller-onboarding.service';
import { CreateSellerOnboardingDto } from './dto/create-seller-onboarding.dto';
import { UpdateSellerOnboardingDto } from './dto/update-seller-onboarding.dto';

@Controller('seller-onboarding')
export class SellerOnboardingController {
  constructor(private readonly sellerOnboardingService: SellerOnboardingService) {}

  @Post('/:id')
  create(@Body() createSellerOnboardingDto: CreateSellerOnboardingDto, @Param('id') id: string) {
    return this.sellerOnboardingService.create(createSellerOnboardingDto, id);
  }

  // @Get()
  // findAll() {
  //   return this.sellerOnboardingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sellerOnboardingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSellerOnboardingDto: UpdateSellerOnboardingDto) {
  //   return this.sellerOnboardingService.update(+id, updateSellerOnboardingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sellerOnboardingService.remove(+id);
  // }
}
