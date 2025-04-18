export class VerifyEmailEvent {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly token: string,
  ) {}
}
