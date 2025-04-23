import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAppointmentRepository } from '../../domain/interfaces/appointment.repository.interface';
import { UpdateAppointmentStatusDto } from '../dto/update-appointment-status.dto';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

@Injectable()
export class UpdateAppointmentStatusUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(dto: UpdateAppointmentStatusDto): Promise<void> {
    const appointmentId = new UniqueEntityID(dto.id);
    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${dto.id} not found`);
    }

    appointment.updateStatus(dto.status);
    await this.appointmentRepository.save(appointment);
  }
}
