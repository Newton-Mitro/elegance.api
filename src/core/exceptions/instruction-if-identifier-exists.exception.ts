import { HttpException, HttpStatus } from '@nestjs/common';

export class InstructionIfIdentifierExistsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message:
          'If the email or phone number exists, instructions will be sent.',
        error: 'identifier_not_found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
