import { Entity, EntityBaseProps } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Email } from '../value-objects/email.vo';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

interface UserProps extends EntityBaseProps {
  name?: string;
  phone: string;
  email?: Email;
  profilePictureUrl?: string;
  password: string;
  status: UserStatus;
}

export class UserEntity extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: UserProps, id?: UniqueEntityID): UserEntity {
    return new UserEntity(
      {
        ...props,
      },
      id,
    );
  }

  get name(): string | undefined {
    return this.props.name;
  }

  get phone(): string {
    return this.props.phone;
  }

  get email(): Email | undefined {
    return this.props.email;
  }

  get profilePictureUrl(): string | undefined {
    return this.props.profilePictureUrl;
  }

  get password(): string {
    return this.props.password;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  public isActive(): boolean {
    return this.props.status === UserStatus.ACTIVE;
  }
}
