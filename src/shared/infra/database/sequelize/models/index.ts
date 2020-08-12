import sequelize from 'sequelize';
import { UserFactory } from './User';

export const dbConfig = new sequelize.Sequelize(
  (process.env.DB_NAME = 'db-name'),
  (process.env.DB_USER = 'db-user'),
  (process.env.DB_PASSWORD = 'db-password'),
  {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export const User = UserFactory(dbConfig);
