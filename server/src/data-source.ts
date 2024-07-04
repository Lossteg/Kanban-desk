import { DataSource } from 'typeorm';
import { parse } from 'pg-connection-string';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: parse(process.env.DATABASE_URL).host,
    port: Number(parse(process.env.DATABASE_URL).port),
    username: parse(process.env.DATABASE_URL).user, 
    password: parse(process.env.DATABASE_URL).password,
    database: parse(process.env.DATABASE_URL).database,
    entities: ['dist/**/entities/*.entity.js'],
    migrations: ['dist/**/migrations/*.js'],
    synchronize: false,
  });