import { IsEnum, IsUUID } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';

export class UpdateAppointmentStatusDto {
  @IsUUID()
  id: string;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
