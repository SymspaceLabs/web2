// src/paypal/paypal.controller.ts
import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { Response } from 'express'; // Import Response for redirecting

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  async createPayPalOrder(@Body() orderPayload: any) { // Accept the full payload
    try {
      const order = await this.paypalService.createOrder(orderPayload);
      // Find the approval link to redirect the user
      const approveLink = order.links.find(link => link.rel === 'approve');
      if (!approveLink) {
        throw new Error('No approval link found from PayPal.');
      }
      // Return the necessary data to the frontend, including the approval URL
      return {
        orderId: order.id,
        approvalUrl: approveLink.href,
        status: order.status,
      };
    } catch (error) {
      // Log and throw appropriate HTTP exceptions
      throw error;
    }
  }

  @Get('capture-order')
  async capturePayPalOrder(
    @Query('token') orderId: string, // PayPal often returns 'token' as the order ID for capture
    @Query('PayerID') payerId: string,
    @Res() res: Response // Use @Res() to manually handle response for redirect
  ) {
    try {
      // You might want to verify PayerID or other details here
      const captureResult = await this.paypalService.captureOrder(orderId);

      if (captureResult.status === 'COMPLETED' || captureResult.status === 'CAPTURED') {
        // Here, you would typically:
        // 1. Update your database with the successful payment (e.g., mark order as paid).
        // 2. Clear user's cart (if not already done on frontend).
        // 3. Redirect user to a success page.
        res.redirect('/orders?paymentStatus=success'); // Redirect to frontend success page
      } else {
        console.error('PayPal capture was not completed:', captureResult);
        res.redirect('/checkout?paymentStatus=failed'); // Redirect to frontend failed page
      }
    } catch (error) {
      console.error('Error capturing PayPal order on backend:', error);
      res.redirect('/checkout?paymentStatus=error'); // Redirect to frontend error page
    }
  }

  // Add a route to handle cancel from PayPal
  @Get('cancel')
  handleCancel(@Res() res: Response) {
    res.redirect('/checkout?paymentStatus=cancelled'); // Redirect to frontend cancel page
  }
}