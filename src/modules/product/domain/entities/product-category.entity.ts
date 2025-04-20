import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface ProductCategoryProps {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductCategoryEntity extends Entity<ProductCategoryProps> {
  private constructor(props: ProductCategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ProductCategoryProps, id?: UniqueEntityID) {
    return new ProductCategoryEntity(props, id);
  }

  get name(): string {
    return this.props.name;
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

  setUpdatedAt(date: Date) {
    this.props.updatedAt = date;
  }
}
