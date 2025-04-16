export interface IJwtService {
  sign(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
