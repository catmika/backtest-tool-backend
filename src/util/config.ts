import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_DB: process.env.MONGO_DB,
  JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;
