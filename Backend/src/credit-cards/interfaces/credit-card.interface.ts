export interface CreditCard { // <--- IMPORTANT: 'export' keyword here
    id: string; // Unique ID for this stored card record
    userId: string; // ID of the user this card belongs to
    last4: string; // Last 4 digits of the card number
    cardBrand: string; // e.g., 'Visa', 'Mastercard', 'Amex'
    expirationMonth: string; // MM
    expirationYear: string; // YY
    token: string; // The token received from the payment gateway
    createdAt: Date;
    updatedAt: Date;
    isDefault: boolean;
}