// src/common/exceptions/inventory-out-of-stock.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InventoryOutOfStockException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The product is out of stock.',
        error: 'inventory_out_of_stock',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
