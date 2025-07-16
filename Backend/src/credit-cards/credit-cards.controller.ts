    import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
    import { CreditCardsService, PaginatedCreditCardsResponse } from './credit-cards.service';
    import { CreateCreditCardDto } from './dto/create-credit-card.dto';
    import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
    import { CreditCard } from './entities/credit-card.entity'; // Ensure CreditCard is imported from entities

    @Controller('credit-cards')
    export class CreditCardsController {
    constructor(private readonly creditCardsService: CreditCardsService) {}

    @Post()
    async create(@Body() createCreditCardDto: CreateCreditCardDto): Promise<CreditCard> {
        return this.creditCardsService.create(createCreditCardDto);
    }

    @Get()
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<PaginatedCreditCardsResponse> {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        return this.creditCardsService.findAll(pageNum, limitNum);
    }

    /**
     * NEW: Endpoint to fetch credit cards by a specific userId.
     * @param userId The ID of the user whose credit cards to fetch.
     * @param page The current page number (1-indexed).
     * @param limit The number of items per page.
     * @returns A paginated response containing credit card data and metadata for the specified user.
     */
    @Get('user/:userId') // New endpoint: /credit-cards/user/{userId}
    async findCardsByUserId(
        @Param('userId') userId: string, // userId is a string (UUID)
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<PaginatedCreditCardsResponse> {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        return this.creditCardsService.findByUserId(userId, pageNum, limitNum);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<CreditCard> {
        return this.creditCardsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCreditCardDto: UpdateCreditCardDto
    ): Promise<CreditCard> {
        return this.creditCardsService.update(id, updateCreditCardDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.creditCardsService.remove(id);
    }

    /**
     * Endpoint to set a specific credit card as the default for the user.
     * This will also unset any other card previously marked as default for the same user.
     * @param id The ID of the credit card to set as default.
     * @returns The updated list of credit cards for the user, with the new default status.
     */
    @Patch(':id/set-default')
    async setDefault(@Param('id', ParseIntPipe) id: number): Promise<CreditCard[]> {
        return this.creditCardsService.setDefaultCard(id);
    }
    }
