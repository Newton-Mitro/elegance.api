// src/common/exceptions/appointment-conflict.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class AppointmentConflictException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The appointment time conflicts with an existing appointment.',
        error: 'appointment_conflict',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
