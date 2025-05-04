import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
dotenv.config();

class DataBase {
  private static db_instance: Sequelize;

  private constructor() {}

  public static getDbInstance = () => {
    if (!DataBase.db_instance) {
      DataBase.db_instance = new Sequelize({
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
    return DataBase.db_instance;
  };
}

export default DataBase;
