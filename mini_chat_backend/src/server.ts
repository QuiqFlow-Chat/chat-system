import { ErrorMiddleware } from './middlewares/errorMiddlewares';
import { Application } from 'express';
import express from 'express';
import { ConversationRoute } from './routes/conversationRoute';
import { MessageRoute } from './routes/messageRoute';
import { UserConversationRoute } from './routes/userConversationRoute';
import { UserRoute } from './routes/userRoute';
import DataBase from './config/database';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io'; // تغيير اسم الكلاس لتجنب التضارب
import { configureSocket } from './config/socket';

export class Server {
  port: number;
  app: Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.authSequelize();
    this.initMiddleware();
    this.initSocket();
    this.initRoutes();
    this.initErrorHandler();
  }

  private authSequelize = async () => {
    const sequelize = DataBase.getDbInstance();
    await sequelize.authenticate();
    console.log('✅ Database connected');
  };

  private initMiddleware = async () => {
    this.app.use(express.json());
  };

  private initSocket = async () => {
    const server = http.createServer(this.app);
    const io = new SocketIOServer(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    configureSocket(io); // تهيئة أحداث Socket.IO

    server.listen(this.port, () => {
      console.log(`✨ Socket.IO server running on http://localhost:${this.port}`);
    });
  };

  private initRoutes = async () => {
    new UserRoute(this.app);
    new ConversationRoute(this.app);
    new MessageRoute(this.app);
    new UserConversationRoute(this.app);
  };
  private initErrorHandler = async () => {
    this.app.use(ErrorMiddleware.handleError);
  };
  public start = async () => {
    this.app.listen(this.port, () => {
      console.log(`❤ Server running on http://localhost:${this.port}`);
    });
  };
}
