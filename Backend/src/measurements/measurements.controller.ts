//measurements.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post('/user/:id')
  create(@Param('id') id: string, @Body() createMeasurementDto: CreateMeasurementDto) {
    return this.measurementsService.create(createMeasurementDto, id);
  }

  @Get()
  findAll() {
    return this.measurementsService.findAll();
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.measurementsService.findOneByUserId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measurementsService.remove(id);
  }
}
