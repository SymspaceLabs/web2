import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UpdatePreferencesDto } from './dto/update-preference.dto';
import { CreatePreferencesDto } from './dto/create-preference.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post('/user/:id')
  create(@Param('id') id: string, @Body() createPreferencesDto: CreatePreferencesDto) {
    return this.preferencesService.create(createPreferencesDto, id);
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.preferencesService.findOneByUserId(id);
  }

  @Get()
  findAll() {
    return this.preferencesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferencesService.remove(+id);
  }
}
