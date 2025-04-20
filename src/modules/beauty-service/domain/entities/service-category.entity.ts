import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface ServiceCategoryProps {
  name: string;
  nameBn?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ServiceCategoryEntity extends Entity<ServiceCategoryProps> {
  private constructor(props: ServiceCategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(
    props: ServiceCategoryProps,
    id?: UniqueEntityID,
  ): ServiceCategoryEntity {
    return new ServiceCategoryEntity(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get nameBn(): string | undefined {
    return this.props.nameBn;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateName(name: string) {
    this.props.name = name;
  }

  updateNameBn(nameBn?: string) {
    this.props.nameBn = nameBn;
  }

  setUpdatedAt(date: Date) {
    this.props.updatedAt = date;
  }
}
