import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  /**
   * Retrieves a single address by its ID.
   * GET /addresses/:id
   * @param id The ID of the address to retrieve.
   * @returns A promise that resolves to an Address entity.
   */
  @Get(':id') // New endpoint to retrieve a single address by its ID
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  /**
   * Retrieves all addresses associated with a specific user ID.
   * GET /addresses/user/:userId
   * @param userId The ID of the user whose addresses are to be retrieved.
   * @returns A promise that resolves to an array of Address entities.
  **/
  @Get('user/:userId') // New endpoint to retrieve addresses by user ID
  findByUserId(@Param('userId') userId: string) {
    return this.addressesService.findByUserId(userId);
  }

  /**
   * Updates an existing address by its ID.
   * PUT /addresses/:id
   * @param id The ID of the address to update.
   * @param updateAddressDto The DTO containing the updated address data.
   * @returns A promise that resolves to the updated Address entity.
   */
  @Patch(':id') // New endpoint to update an address by ID
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, updateAddressDto);
  }

  /**
   * Deletes an address by its ID.
   * DELETE /addresses/:id
   * @param id The ID of the address to delete.
   * @returns A promise that resolves to a success message.
   */
  @Delete(':id') // Endpoint for deleting an address
  @HttpCode(HttpStatus.NO_CONTENT) // Typically, DELETE requests return 204 No Content on success
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
