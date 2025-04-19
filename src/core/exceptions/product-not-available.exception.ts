// src/common/exceptions/product-not-available.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class ProductNotAvailableException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The product is not available.',
        error: ExceptionName.ProductNoAvailable,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
