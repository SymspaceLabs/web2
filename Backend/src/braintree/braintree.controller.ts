import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { BraintreeService } from './braintree.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Response } from 'express'; // For direct response manipulation if needed

@Controller('braintree') // Base route for Braintree APIs
export class BraintreeController {
  constructor(private readonly braintreeService: BraintreeService) {}

  /**
   * GET /api/braintree/client-token
   * Generates and returns a client token for the frontend.
   */
  @Get('client-token')
  async getClientToken(@Res() res: Response) {
    try {
      const clientToken = await this.braintreeService.generateClientToken();
      return res.status(HttpStatus.OK).json({ clientToken });
    } catch (error) {
      // InternalServerErrorException thrown by service will be caught by NestJS's exception filter
      // and automatically return 500 status. We can refine this if needed.
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Failed to generate client token',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * POST /api/braintree/checkout
   * Processes a payment transaction using the nonce received from the frontend.
   */
  @Post('checkout')
  async createCheckout(@Body() createTransactionDto: CreateTransactionDto, @Res() res: Response) {
    try {
      const result = await this.braintreeService.createTransaction(createTransactionDto);

      if (result.success) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'Transaction successful',
          transaction: {
            id: result.transaction.id,
            amount: result.transaction.amount,
            currencyIsoCode: result.transaction.currencyIsoCode,
            status: result.transaction.status,
            // Add other relevant transaction details you want to send to frontend
          },
        });
      } else {
        // Braintree errors handled by service, re-throwing causes InternalServerErrorException
        // Here we can give more specific messages for failed transactions from Braintree's side
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: result.message || 'Transaction failed.',
          errors: result.errors ? result.errors.deepErrors() : null, // Braintree specific errors
        });
      }
    } catch (error) {
      console.error('Controller error during Braintree checkout:', error);
      // Catch exceptions thrown by service or other unexpected errors
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Internal server error during checkout',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}