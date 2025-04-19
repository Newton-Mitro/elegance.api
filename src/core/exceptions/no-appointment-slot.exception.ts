// src/common/exceptions/no-appointment-slot.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class NoAppointmentSlotAvailableException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No available appointment slots.',
        error: ExceptionName.NoAppointmentSlotAvailable,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
