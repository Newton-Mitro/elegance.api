import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class UserAccountNotVerifiedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'User account not verified',
        error: ExceptionName.UserAccountNotVerified,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
