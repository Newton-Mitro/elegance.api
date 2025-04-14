import { ValueObject } from '../../../../core/value-objects/value-object';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static create(email: string): Email {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Invalid email format');
    }

    return new Email({ value: email });
  }

  get value(): string {
    return this.props.value;
  }
}
