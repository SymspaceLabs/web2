import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingAddressesService } from './billing-addresses.service';
import { CreateBillingAddressDto } from './dto/create-billing-address.dto';
import { UpdateBillingAddressDto } from './dto/update-billing-address.dto';

@Controller('billing-addresses')
export class BillingAddressesController {
  constructor(private readonly billingAddressesService: BillingAddressesService) {}

  @Post()
  create(@Body() createBillingAddressDto: CreateBillingAddressDto) {
    return this.billingAddressesService.create(createBillingAddressDto);
  }

  @Get()
  findAll() {
    return this.billingAddressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingAddressesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingAddressDto: UpdateBillingAddressDto) {
    return this.billingAddressesService.update(+id, updateBillingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingAddressesService.remove(+id);
  }
}
