// src/common/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found.',
        error: 'user_not_found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
