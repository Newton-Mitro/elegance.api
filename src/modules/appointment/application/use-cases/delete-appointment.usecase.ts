import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAppointmentRepository } from '../../domain/interfaces/appointment.repository.interface';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(id: string): Promise<void> {
    const appointmentId = new UniqueEntityID(id);
    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    // Check if the appointment has an invoice
    const invoice = await this.prisma.invoice.findUnique({
      where: { appointmentId: id },
    });

    if (invoice) {
      throw new Error('Cannot delete appointment with an associated invoice');
    }

    await this.appointmentRepository.delete(appointmentId);
  }
}
