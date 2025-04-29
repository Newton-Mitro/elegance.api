import { UserStatus } from '@prisma/client';
import { Entity, EntityBaseProps } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Email } from '../value-objects/email.vo';

export interface UserProps extends EntityBaseProps {
  name?: string;
  phone?: string;
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

  get phone(): string | undefined {
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

  public updateUser({
    name,
    phone,
    email,
  }: {
    name?: string;
    phone?: string;
    email?: Email;
  }): void {
    if (name !== undefined) {
      this.props.name = name;
    }

    if (phone !== undefined) {
      this.props.phone = phone;
    }

    if (email !== undefined) {
      this.props.email = email;
    }

    this.touch(); // updates updatedAt if supported
  }

  public updateProfilePicture(url: string): void {
    this.props.profilePictureUrl = url;
    this.touch();
  }

  public isActive(): boolean {
    return this.props.status === UserStatus.ACTIVE;
  }

  public setPassword(password: string) {
    this.props.password = password;
    this.touch();
  }

  // ✅ Change status method
  public changeStatus(newStatus: UserStatus): void {
    this.props.status = newStatus;
    this.touch(); // Optionally update the updatedAt timestamp if supported
  }

  // Optional helper methods
  public activate(): void {
    this.changeStatus(UserStatus.ACTIVE);
  }

  public deactivate(): void {
    this.changeStatus(UserStatus.INACTIVE);
  }

  public suspend(): void {
    this.changeStatus(UserStatus.SUSPENDED);
  }
}
