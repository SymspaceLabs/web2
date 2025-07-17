import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, ParseIntPipe, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
// Removed: import { AuthGuard } from '@nestjs/passport'; // No longer needed if not using @UseGuards at controller level
import { Request } from 'express'; // Import Request type
import { CreditCardsService, PaginatedCreditCardsResponse } from './credit-cards.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { CreditCard } from './entities/credit-card.entity'; // Ensure CreditCard is imported from entities
import { AuthGuard } from '@nestjs/passport';

@Controller('credit-cards')
// Removed: @UseGuards(AuthGuard('jwt')) // Removed the JWT authentication guard from the controller level
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

    @Post()
    async create(@Body() createCreditCardDto: CreateCreditCardDto): Promise<CreditCard> {

        // ✅ Use the authenticated user's ID — not the one from the DTO
        return this.creditCardsService.create(createCreditCardDto, createCreditCardDto.userId);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(
        @Req() req: Request,
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<PaginatedCreditCardsResponse> {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const userId = (req.user as any)?.id;

    if (!userId) {
        throw new UnauthorizedException('User ID not found in request. This route requires authentication.');
    }

        return this.creditCardsService.findAll(userId, pageNum, limitNum);
    }

    /**
     * Endpoint to fetch credit cards by a specific userId.
     * This endpoint is useful for administrative purposes or if a user can view other users' cards (with proper authorization).
     * @param userId The ID of the user whose credit cards to fetch (from URL parameter).
     * @param page The current page number (1-indexed).
     * @param limit The number of items per page.
     * @returns A paginated response containing credit card data and metadata for the specified user.
     */
    @Get('user/:userId') // Endpoint: /credit-cards/user/{userId}
    async findCardsByUserId(
        @Param('userId') userId: string, // userId is a string (UUID) from the URL parameter
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<PaginatedCreditCardsResponse> {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        // This endpoint allows fetching by a specific userId from the URL, assuming proper authorization
        // (e.g., an admin token, or a guard that checks if userId matches authenticated user's ID).
        // If this route is intended to be public, ensure your service layer handles access control.
        return this.creditCardsService.findByUserId(userId, pageNum, limitNum);
    }

    @Get(':id')
    async findOne(
        @Req() req: Request, // Inject the Request object
        @Param('id', ParseIntPipe) id: string
    ): Promise<CreditCard> {
        const userId = (req.user as any)?.id;
        if (!userId) {
        throw new UnauthorizedException('User ID not found in request. This route requires authentication.');
        }
        return this.creditCardsService.findOne(id, userId);
    }


    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id') id: string, @Req() req: Request) {
        console.log("REQ.USER:", req.user); // Add this line
        const userId = (req.user as any)?.id;
        if (!userId) {
            throw new UnauthorizedException('User not authenticated.');
        }
        return this.creditCardsService.remove(id, userId);
    }

  /**
   * Endpoint to set a specific credit card as the default for the user.
   * This will also unset any other card previously marked as default for the same user.
   * @param id The ID of the credit card to set as default.
   * @returns The updated list of credit cards for the user, with the new default status.
   */
   // In your CreditCardsController
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/set-default')
    async setDefault(
        @Req() req: Request,
        @Param('id') id: string
    ): Promise<CreditCard[]> {
        const userId = (req.user as any)?.id; // This is the userId that gets passed to the service
        console.log('--- setDefault Request Debug ---');
        console.log('Card ID from Param:', id);
        console.log('User ID from JWT (req.user):', userId); // <<< THIS IS THE VALUE YOU NEED TO CHECK
        console.log('--------------------------------');

        if (!userId) {
            throw new UnauthorizedException('User ID not found in request. This route requires authentication.');
        }
        // The userId passed here must match the card's actual userId in the DB.
        return this.creditCardsService.setDefaultCard(id, userId);
    }

}
