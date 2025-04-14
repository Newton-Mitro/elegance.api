import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

interface RoleProps {
  name: string;
  description?: string;
}

export class RoleEntity extends Entity<RoleProps> {
  private constructor(props: RoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RoleProps, id?: UniqueEntityID): RoleEntity {
    return new RoleEntity(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }
}
