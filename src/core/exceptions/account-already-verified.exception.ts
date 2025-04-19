import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class AccountAlreadyVerifiedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Account already verified',
        error: ExceptionName.AccountAlreadyVerified,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
