import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class UserAlreadyRegisteredException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: 'User is already registered',
        error: ExceptionName.UserAlreadyRegistered,
      },
      HttpStatus.CONFLICT,
    );
  }
}
