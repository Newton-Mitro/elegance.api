// src/common/exceptions/invalid-coupon-code.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class InvalidCouponCodeException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The coupon code is invalid or expired.',
        error: ExceptionName.InvalidCouponCode,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
