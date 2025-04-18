// src/common/exceptions/invalid-coupon-code.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCouponCodeException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The coupon code is invalid or expired.',
        error: 'invalid_coupon_code',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
