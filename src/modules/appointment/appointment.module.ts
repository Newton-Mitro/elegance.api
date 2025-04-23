import { Module } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateAppointmentUseCase } from './application/use-cases/create-appointment.usecase';
import { PrismaAppointmentRepository } from './infrastructure/repositories/prisma-appointment.repository';
import { AppointmentController } from './presentation/controllers/appointment.controller';
import { UpdateAppointmentStatusUseCase } from './application/use-cases/update-appointment-status.usecase';
import { GetAppointmentByIdUseCase } from './application/use-cases/get-appointment-by-id.usecase';
import { GetAppointmentsUseCase } from './application/use-cases/get-appointments.usecase';
import { DeleteAppointmentUseCase } from './application/use-cases/delete-appointment.usecase';

@Module({
  controllers: [AppointmentController],
  providers: [
    PrismaService,
    CreateAppointmentUseCase,
    UpdateAppointmentStatusUseCase,
    GetAppointmentByIdUseCase,
    GetAppointmentsUseCase,
    DeleteAppointmentUseCase,
    {
      provide: 'IAppointmentRepository',
      useClass: PrismaAppointmentRepository,
    },
  ],
  exports: [
    CreateAppointmentUseCase,
    UpdateAppointmentStatusUseCase,
    GetAppointmentByIdUseCase,
    GetAppointmentsUseCase,
    DeleteAppointmentUseCase,
  ],
})
export class AppointmentModule {}
