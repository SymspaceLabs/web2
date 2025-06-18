// src/paypal/paypal.service.ts
import axios from 'axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class PaypalService {
    private readonly logger = new Logger(PaypalService.name);
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly apiUrl: string;

    constructor() {
        // Removed debug logs for raw process.env values
        this.clientId = process.env.PAYPAL_CLIENT_ID;
        this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        this.apiUrl = process.env.PAYPAL_API_BASE_URL || 'https://api-m.sandbox.paypal.com';

        // Removed debug logs for initialized values

        if (!this.clientId || !this.clientSecret) {
            this.logger.error('PayPal API credentials (CLIENT_ID or CLIENT_SECRET) are NOT LOADED. Check your .env file and process.env. Ensure .env is in the project root.');
            throw new InternalServerErrorException('PayPal configuration missing: Client ID or Secret. Cannot proceed with token generation.');
        }
    }

    /**
     * Generates an OAuth 2.0 access token from PayPal.
     * This token is required for authenticating all subsequent PayPal REST API calls.
     * @returns {Promise<string>} The access token string.
     * @throws {InternalServerErrorException} If token generation fails.
     */
    private async generateAccessToken(): Promise<string> {
        try {
            if (!this.clientId || !this.clientSecret) {
                this.logger.error('[generateAccessToken] Client ID or Secret is missing, cannot generate token. This should have been caught in constructor.');
                throw new InternalServerErrorException('PayPal credentials missing for token generation.');
            }

            const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

            // Removed debug logs for client ID, basic auth, and token URL
            const response = await axios.post(
                `${this.apiUrl}/v1/oauth2/token`,
                'grant_type=client_credentials',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${auth}`,
                    },
                },
            );
            this.logger.log('PayPal access token generated successfully.');
            return response.data.access_token;
        } catch (error) {
            this.logger.error(`Error generating PayPal access token: ${error.message}`);
            if (axios.isAxiosError(error) && error.response) {
                this.logger.error(`PayPal API Error Response - Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
                if (error.response.status === 401) {
                    if (error.response.data.error === 'invalid_client') {
                        this.logger.error('CRITICAL: PayPal rejected Basic Auth (invalid client credentials). Double-check CLIENT_ID and CLIENT_SECRET in your .env file against your PayPal Dashboard sandbox app credentials. No leading/trailing spaces.');
                    } else {
                        this.logger.error('PayPal 401 Error: Unspecified authentication failure. Verify URL and credentials.');
                    }
                } else if (error.response.status === 400) {
                    this.logger.error(`PayPal 400 Error (Bad Request): This often indicates a malformed request body or URL. Ensure 'grant_type=client_credentials' is correct and the URL '${this.apiUrl}/v1/oauth2/token' is precise.`);
                }
            } else if (axios.isAxiosError(error) && error.request) {
                this.logger.error(`No response received from PayPal. Network issue? Is the PayPal API URL correct and accessible? Request data: ${JSON.stringify(error.toJSON())}`);
            } else {
                this.logger.error(`Error during token request setup or non-Axios error: ${error.message}`);
            }
            throw new InternalServerErrorException('Failed to generate PayPal access token.');
        }
    }

    async createOrder(orderPayload: any): Promise<any> {
        const accessToken = await this.generateAccessToken();
        try {
            // Removed debug log for order payload
            const response = await axios.post(
                `${this.apiUrl}/v2/checkout/orders`,
                orderPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        'PayPal-Request-Id': `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    },
                },
            );
            this.logger.log(`PayPal order created with ID: ${response.data.id}`);
            return response.data;
        } catch (error) {
            this.logger.error(`Error creating PayPal order: ${error.message}`);
            if (axios.isAxiosError(error) && error.response) {
                this.logger.error(`PayPal API Error Response - Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
            }
            throw new InternalServerErrorException('Failed to create PayPal order.');
        }
    }

    async captureOrder(orderId: string): Promise<any> {
        const accessToken = await this.generateAccessToken();
        try {
            // Removed debug log for capturing order ID
            const response = await axios.post(
                `${this.apiUrl}/v2/checkout/orders/${orderId}/capture`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        'PayPal-Request-Id': `capture-${Date.now()}-${orderId}`,
                    },
                },
            );
            this.logger.log(`PayPal order captured successfully. Status: ${response.data.status}`);
            return response.data;
        } catch (error) {
            this.logger.error(`Error capturing PayPal order: ${error.response?.data ? JSON.stringify(error.response.data) : error.message}`);
            throw new InternalServerErrorException('Failed to capture PayPal order.');
        }
    }
}
