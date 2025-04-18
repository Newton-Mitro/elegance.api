import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotVerifiedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Email not verified',
        error: 'email_not_verified',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
