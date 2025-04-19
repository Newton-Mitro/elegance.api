// src/common/exceptions/resource-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'The requested resource could not be found.',
        error: ExceptionName.ResourceNotFound,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
