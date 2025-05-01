import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import Message from '../models/Message';
import Conversation from '../models/Conversation';
import User from '../models/User';
import UserConversation from '../models/UserConversation';
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
        dialect: 'postgres',
        define: {
          underscored: true,
        },
        models: [User, Message, Conversation, UserConversation],
      });
    }
    return DataBase.db_instance;
  };
}

export default DataBase;
