// src/common/exceptions/appointment-cancellation-failed.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class AppointmentCancellationFailedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          'Appointment cancellation failed. The appointment might have already passed or cannot be cancelled.',
        error: ExceptionName.AppointmentCancellationFailed,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
