// src/common/exceptions/invalid-payment.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class InvalidPaymentException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid payment method or payment failed.',
        error: ExceptionName.InvalidPayment,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
