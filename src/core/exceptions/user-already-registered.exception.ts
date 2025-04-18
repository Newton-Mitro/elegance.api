import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyRegisteredException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: 'User is already registered',
        error: 'user_already_registered',
      },
      HttpStatus.CONFLICT,
    );
  }
}
