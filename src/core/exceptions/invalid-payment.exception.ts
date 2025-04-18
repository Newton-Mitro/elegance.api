// src/common/exceptions/invalid-payment.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPaymentException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid payment method or payment failed.',
        error: 'invalid_payment',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
