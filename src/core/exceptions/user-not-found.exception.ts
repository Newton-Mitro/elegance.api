// src/common/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found.',
        error: ExceptionName.UserNotFound,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
