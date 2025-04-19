// src/common/exceptions/service-already-booked.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class ServiceAlreadyBookedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'This service has already been booked for the selected time.',
        error: ExceptionName.ServiceAlreadyBooked,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
