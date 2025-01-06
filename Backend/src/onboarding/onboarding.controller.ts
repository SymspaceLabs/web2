import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
// import { UpdateOnboardingDto } from './dto/update-onboarding.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('/user/:id')
  async create(
    @Param('id') id: string,
    @Body() createOnboardingDto: CreateOnboardingDto,
  ){
    return await this.onboardingService.create(createOnboardingDto, id);
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.onboardingService.findOneByUserId(id);
  }

}
