// src/common/exceptions/service-already-booked.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceAlreadyBookedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'This service has already been booked for the selected time.',
        error: 'service_already_booked',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
