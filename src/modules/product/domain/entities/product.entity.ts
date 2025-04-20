import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface ProductProps {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  vatRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductEntity extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ProductProps, id?: UniqueEntityID): ProductEntity {
    return new ProductEntity(props, id);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get stock() {
    return this.props.stock;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get vatRate() {
    return this.props.vatRate;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  updateDetails(props: Partial<Omit<ProductProps, 'createdAt' | 'updatedAt'>>) {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.description !== undefined)
      this.props.description = props.description;
    if (props.price !== undefined) this.props.price = props.price;
    if (props.stock !== undefined) this.props.stock = props.stock;
    if (props.categoryId !== undefined)
      this.props.categoryId = props.categoryId;
    if (props.vatRate !== undefined) this.props.vatRate = props.vatRate;
  }

  setUpdatedAt(date: Date) {
    this.props.updatedAt = date;
  }
}
