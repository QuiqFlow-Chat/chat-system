import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';

// Load environment variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '../../..', '.env') });

class DataBase {
  private static db_instance: Sequelize;
  private constructor() {}

  public static getDbInstance() {
    if (!DataBase.db_instance) {
      // Check if required environment variables are available
      if (!process.env.DB_PASSWORD) {
        throw new Error('Database password is missing in environment variables');
      }

      DataBase.db_instance = new Sequelize({
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: String(process.env.DB_PASSWORD), // Ensure password is a string
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        define: {
          underscored: true,
        },
        models: [__dirname + '/models'],
        logging: false, // Set to console.log to see SQL queries
      });
    }
    return DataBase.db_instance;
  }
}
export default DataBase;
