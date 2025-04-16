export interface INotificationAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface ISendNotificationOptions {
  to: string;
  subject: string;
  body: string;
  attachments?: INotificationAttachment[];
}

export interface INotificationService {
  send(options: ISendNotificationOptions): Promise<void>;
}
