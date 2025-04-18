// src/common/exceptions/no-appointment-slot.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class NoAppointmentSlotAvailableException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No available appointment slots.',
        error: 'no_appointment_slot_available',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
