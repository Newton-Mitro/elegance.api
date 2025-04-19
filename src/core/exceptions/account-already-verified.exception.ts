import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountAlreadyVerifiedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Account already verified',
        error: 'account_already_verified',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
