import { AppointmentStatus } from '@prisma/client';

export interface AppointmentServiceDto {
  id: string;
  serviceId: string;
  price: any; // Using any for Decimal compatibility
}

export interface AppointmentDto {
  id: string;
  userId?: string;
  appointmentTime: Date;
  isWalkIn: boolean;
  status: AppointmentStatus;
  services: AppointmentServiceDto[];
  createdAt?: Date;
  updatedAt?: Date;
}
