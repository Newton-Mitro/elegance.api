export interface NotificationAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface SendNotificationOptions {
  to: string;
  subject: string;
  body: string;
  attachments?: NotificationAttachment[];
}

export interface NotificationService {
  send(options: SendNotificationOptions): Promise<void>;
}
