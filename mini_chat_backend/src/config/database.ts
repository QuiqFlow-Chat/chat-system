import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
dotenv.config();

class DataBase {
  private static dbInstance: Sequelize;

  private constructor() {}

  public static getDbInstance = (): Sequelize => {
    if (!DataBase.dbInstance) {
      if (
        !process.env.DB_USER ||
        !process.env.DB_PASSWORD ||
        !process.env.DB_NAME ||
        !process.env.DB_HOST ||
        !process.env.DB_PORT
      ) {
        throw new Error('Missing required environment variables for database configuration.');
      }
      DataBase.dbInstance = new Sequelize({
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres' as Dialect,
        define: {
          underscored: true,
        },
        models: [__dirname + '/../models'],
      });
    }
    return DataBase.dbInstance;
  };
}

export default DataBase;
