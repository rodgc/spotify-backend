import { config } from 'dotenv';

const env =
  config({ path: process.env.APP_ENV ? `.env.${process.env.APP_ENV}` : '.env' })
    .parsed ?? {};

export const getEnvVar = (key: string): string => {
  if (!env[key]) {
    throw new Error(`Environmental variable ${key} is missing`);
  }
  return env[key];
};
