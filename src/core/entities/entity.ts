import { UniqueEntityID } from './unique-entity-id';

export type EntityBaseProps = {
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class Entity<Props extends EntityBaseProps> {
  protected readonly _id: UniqueEntityID;
  protected readonly props: Props;

  constructor(props: Props, id?: UniqueEntityID) {
    const now = new Date();
    this._id = id ?? new UniqueEntityID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    };
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  /**
   * Use this method when the entity is updated to refresh the updatedAt timestamp
   */
  protected touch(): void {
    this.props.updatedAt = new Date();
  }

  equals(object?: Entity<Props>): boolean {
    if (object == null || object == undefined) return false;
    if (this === object) return true;
    return this._id.equals(object._id);
  }
}
