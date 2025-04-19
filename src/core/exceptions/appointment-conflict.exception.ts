// src/common/exceptions/appointment-conflict.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class AppointmentConflictException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The appointment time conflicts with an existing appointment.',
        error: ExceptionName.AppointmentConflict,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
