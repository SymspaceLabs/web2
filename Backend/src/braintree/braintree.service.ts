import * as braintree from 'braintree';
import { ConfigService } from '@nestjs/config';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class BraintreeService {
  private gateway: braintree.BraintreeGateway;

  constructor(private configService: ConfigService) {
    // Initialize Braintree Gateway using environment variables
    this.gateway = new braintree.BraintreeGateway({
      environment: this.configService.get<string>('BRAINTREE_ENVIRONMENT') === 'Production'
        ? braintree.Environment.Production
        : braintree.Environment.Sandbox,
      merchantId: this.configService.get<string>('BRAINTREE_MERCHANT_ID'),
      publicKey: this.configService.get<string>('BRAINTREE_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('BRAINTREE_PRIVATE_KEY'),
    });
  }

  /**
   * Generates a client token for the frontend.
   * This token allows the frontend to initialize the Braintree Drop-in UI.
   */
  async generateClientToken(): Promise<string> {
    try {
      const response = await this.gateway.clientToken.generate({});
      if (response.success) {
        return response.clientToken;
      } else {
        // Log the errors from Braintree for debugging
        console.error('Braintree client token generation errors:', response.errors.deepErrors());
        throw new InternalServerErrorException('Failed to generate Braintree client token.');
      }
    } catch (error) {
      console.error('Error generating Braintree client token:', error);
      throw new InternalServerErrorException('Error generating Braintree client token.', error.message);
    }
  }

  /**
   * Processes a payment transaction using a nonce from the frontend.
   * @param createTransactionDto - Contains nonce, amount, currency, etc.
   */
  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<braintree.Transaction.Result> {
    const { paymentMethodNonce, amount, currency, ...additionalOptions } = createTransactionDto;

    try {
      const result = await this.gateway.transaction.sale({
        amount: amount.toFixed(2), // Ensure amount is a string with 2 decimal places
        paymentMethodNonce: paymentMethodNonce,
        currencyIsoCode: currency, // Important for currency
        options: {
          submitForSettlement: true, // Automatically capture the payment
          // Add any other options like customer, billing, shipping info here
          ...additionalOptions, // Allow passing additional options from DTO
        },
      });

      if (result.success) {
        return result; // Contains transaction details
      } else {
        // Log the errors from Braintree for debugging
        console.error('Braintree transaction errors:', result.errors.deepErrors());
        throw new InternalServerErrorException(result.message || 'Braintree transaction failed.');
      }
    } catch (error) {
      console.error('Error creating Braintree transaction:', error);
      throw new InternalServerErrorException('Error processing payment.', error.message);
    }
  }
}