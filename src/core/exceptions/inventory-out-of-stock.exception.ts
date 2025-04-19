// src/common/exceptions/inventory-out-of-stock.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class InventoryOutOfStockException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The product is out of stock.',
        error: ExceptionName.InventoryOutOfStock,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
