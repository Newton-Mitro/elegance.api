// src/common/exceptions/payment-failed.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentFailedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.PAYMENT_REQUIRED,
        message: 'Payment processing failed.',
        error: 'payment_failed',
      },
      HttpStatus.PAYMENT_REQUIRED,
    );
  }
}
