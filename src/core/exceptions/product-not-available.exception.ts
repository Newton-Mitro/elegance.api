// src/common/exceptions/product-not-available.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotAvailableException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The product is not available.',
        error: 'product_not_available',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
