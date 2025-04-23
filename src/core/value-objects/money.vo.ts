import { ValueObject } from './value-object';

export class Money extends ValueObject<number> {
  private readonly amount: number;
  private readonly currency: string;

  constructor(amount: number, currency: string) {
    super(amount);
    this.amount = amount;
    this.currency = currency.toUpperCase();
    this.validate();
  }
  private validate(): void {
    if (isNaN(this.amount)) {
      throw new Error('Amount must be a valid number');
    }
    if (!this.currency || this.currency.length !== 3) {
      throw new Error('Currency must be a valid 3-letter code');
    }
  }

  public equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  public add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  public subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot subtract money with different currencies');
    }
    return new Money(this.amount - other.amount, this.currency);
  }

  public multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public toString(): string {
    return `${this.amount} ${this.currency}`;
  }
}
