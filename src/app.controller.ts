import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Public } from './core/decorators/public.decorator';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Public()
  getHello(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Application is running',
    });
  }
}
