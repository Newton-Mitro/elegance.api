import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class InstructionIfIdentifierExistsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message:
          'If the email or phone number exists, instructions will be sent.',
        error: ExceptionName.IdentifierNotFound,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
