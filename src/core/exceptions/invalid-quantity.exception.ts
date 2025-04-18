// src/common/exceptions/invalid-quantity.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidQuantityException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The quantity specified is invalid.',
        error: 'invalid_quantity',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
