import dotenv from 'dotenv';
import glob from 'glob';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
dotenv.config();

 class DataBase {
    private static db_instance: Sequelize;
    private constructor() {}

    public static getDbInsatnce() {
        if (!DataBase.db_instance) {
            DataBase.db_instance = new Sequelize({
                username: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                dialect: 'postgres',
                models: glob.sync(path.join(__dirname, 'models', '*.ts')).map((file) => require(file).default),
            });
        }
        return DataBase.db_instance;
    }
}
export default DataBase;