import { Application } from 'express';
import express from 'express';
import { ConversationRoute } from './routes/conversationRoute';
import { MessageRoute } from './routes/messageRoute';
import { UserConversationRoute } from './routes/userConversationRoute';
import { UserRoute } from './routes/userRoute';
import DataBase from './config/database';

export class Server {
  port: number;
  app: Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.authSequelize();
    this.initMiddleware();
    this.initRoutes();
  }
  private authSequelize = async () => {
    const sequelize = DataBase.getDbInstance();
    sequelize.authenticate();
    console.log('✅ Database connected');
  };
  private initMiddleware = async () => {
    this.app.use(express.json());
  };
  private initRoutes = async () => {
    const userRoute = new UserRoute(this.app);
    const conversationRoute = new ConversationRoute(this.app);
    const messageRoute = new MessageRoute(this.app);
    const userConversationRoute = new UserConversationRoute(this.app);
  };
  public start = async () => {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  };
}
