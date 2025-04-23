import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AppointmentServiceDto {
  @IsUUID()
  serviceId: string;
}

export class CreateAppointmentDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsDateString()
  appointmentTime: string;

  @IsBoolean()
  isWalkIn: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppointmentServiceDto)
  services: AppointmentServiceDto[];
}
