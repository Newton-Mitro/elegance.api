export default () => ({
  // Server Configuration
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',

  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || 'mysql://localhost:3306/defaultdb',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    name: process.env.DATABASE_NAME || 'mydb',
  },

  // API Configuration
  apiKey: process.env.API_KEY || 'your-default-api-key',

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-default-jwt-secret',
    exp: process.env.JWT_EXP || '1h', // JWT expiration time
    refExp: process.env.JWT_REF_EXP || '7d', // JWT refresh token expiration time
    issuer: process.env.JWT_ISSUER || 'your-app-name', // JWT issuer
    audience: process.env.JWT_AUDIENCE || 'your-app-users', // JWT audience
  },

  // Email Configuration
  email: {
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    username: process.env.EMAIL_USERNAME || 'your-email-username',
    password: process.env.EMAIL_PASSWORD || 'your-email-password',
  },

  // SMS Configuration
  sms: {
    apiUrl: process.env.SMS_API_URL,
    apiKey: process.env.SMS_API_KEY,
    apiSecret: process.env.SMS_API_SECRET,
    senderId: process.env.SMS_SENDER_ID,
  },

  // Logging Configuration
  logLevel: process.env.LOG_LEVEL || 'info', // Options: "debug", "info", "warn", "error"

  // File Storage Configuration
  storagePath: process.env.STORAGE_PATH || '/tmp/uploads',

  // Third-party service configurations
  thirdPartyServiceUrl:
    process.env.THIRD_PARTY_SERVICE_URL || 'https://api.thirdparty.com',

  // Feature flags (example: whether to enable a feature)
  enableFeatureX: process.env.ENABLE_FEATURE_X === 'true',

  // Application Environment
  environment: process.env.NODE_ENV || 'development', // Options: "development", "production", "staging"

  // Redis Configuration (if applicable)
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || 'default-redis-password',
  },

  whatsapp: {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  },
});
