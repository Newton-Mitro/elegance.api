import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface ServiceProps {
  name: string;
  nameBn?: string;
  description?: string;
  categoryId: string;
  price: number;
  durationMin: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ServiceEntity extends Entity<ServiceProps> {
  private constructor(props: ServiceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ServiceProps, id?: UniqueEntityID): ServiceEntity {
    return new ServiceEntity(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get nameBn(): string | undefined {
    return this.props.nameBn;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get price(): number {
    return this.props.price;
  }

  get durationMin(): number {
    return this.props.durationMin;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateDetails(props: Partial<Omit<ServiceProps, 'createdAt' | 'updatedAt'>>) {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.nameBn !== undefined) this.props.nameBn = props.nameBn;
    if (props.description !== undefined)
      this.props.description = props.description;
    if (props.categoryId !== undefined)
      this.props.categoryId = props.categoryId;
    if (props.price !== undefined) this.props.price = props.price;
    if (props.durationMin !== undefined)
      this.props.durationMin = props.durationMin;
  }

  setUpdatedAt(date: Date) {
    this.props.updatedAt = date;
  }
}
