// src/common/exceptions/resource-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'The requested resource could not be found.',
        error: 'resource_not_found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
