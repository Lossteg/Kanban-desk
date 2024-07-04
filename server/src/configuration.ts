import * as joi from 'joi';

export const envConfigSchema = joi.object({
  PORT: joi.number().min(1).max(65000).default(80),
  DATABASE_URL: joi.string().required(),
});