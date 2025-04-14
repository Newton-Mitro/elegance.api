import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Email } from '../value-objects/email.vo';
import { RoleEntity } from './role.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

interface UserProps {
  name?: string;
  phone: string;
  email?: Email;
  profilePictureUrl?: string;
  password: string;
  status: UserStatus;
  roles: RoleEntity[];
  createdAt: Date;
}

export class UserEntity extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(
    props: Omit<UserProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): UserEntity {
    return new UserEntity(
      {
        ...props,
        createdAt: new Date(),
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

  get roles(): RoleEntity[] {
    return this.props.roles;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public isActive(): boolean {
    return this.props.status === UserStatus.ACTIVE;
  }

  public addRole(role: RoleEntity): void {
    if (!this.props.roles.find((r) => r.id === role.id)) {
      this.props.roles.push(role);
    }
  }

  public removeRole(roleId: UniqueEntityID): void {
    this.props.roles = this.props.roles.filter(
      (role) => !role.id.equals(roleId),
    );
  }
}
