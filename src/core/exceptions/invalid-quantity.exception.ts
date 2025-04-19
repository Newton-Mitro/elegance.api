// src/common/exceptions/invalid-quantity.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class InvalidQuantityException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The quantity specified is invalid.',
        error: ExceptionName.InvalidQuantity,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
