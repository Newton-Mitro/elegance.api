export interface EmailConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface DatabaseConfig {
  url: string;
  user: string;
  password: string;
  name: string;
}

export interface JwtConfig {
  secret: string;
  exp: string; // e.g. "1h"
  refExp: string; // e.g. "7d"
  issuer: string;
  audience: string;
}

export interface WhatsappConfig {
  phoneNumberId: string;
  accessToken: string;
}

export interface SmsConfig {
  apiUrl: string;
  apiKey: string;
  apiSecret: string;
  senderId: string;
}
