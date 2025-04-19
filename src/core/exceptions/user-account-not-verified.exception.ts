import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAccountNotVerifiedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'User account not verified',
        error: 'user_account_not_verified',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
