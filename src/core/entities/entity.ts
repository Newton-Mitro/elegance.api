import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<Props> {
  protected readonly _id: UniqueEntityID;
  public readonly props: Props;

  constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();
    this.props = props;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  equals(object?: Entity<Props>): boolean {
    if (object == null || object == undefined) return false;
    if (this === object) return true;
    return this._id.equals(object._id);
  }
}
