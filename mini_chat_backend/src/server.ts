import { ErrorMiddleware } from '@/middlewares/errorMiddlewares';
import { Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { ConversationRoute } from '@/routes/conversationRoute';
import { MessageRoute } from '@/routes/messageRoute';
import { UserConversationRoute } from '@/routes/userConversationRoute';
import { UserRoute } from '@/routes/userRoute';
import DataBase from '@/config/database';
import http from 'http';
import { AuthRoute } from '@/routes/authRoute';
import { initializeSocket } from '@/config/socket';
import express from 'express';
import { ClientToServerEvents, SocketData } from './types/socketType';
import { ServerToClientEvents } from './types/socketType';



export class Server {
  port: number;
  app: Application;
  httpServer: http.Server;
  io: SocketIOServer<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

  constructor(port: number) {    this.port = port;
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>(this.httpServer, {
      cors: {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      },
    });

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
    // Enable CORS for all origins
    this.app.use(
      cors({
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    );

    this.app.use(express.json());
  };
  private initSocket = async () => {
    initializeSocket({ io: this.io });
  };

  private initRoutes = async () => {
    new AuthRoute(this.app);
    new UserRoute(this.app);
    new ConversationRoute(this.app);
    new MessageRoute(this.app);
    new UserConversationRoute(this.app);
  };

  private initErrorHandler = async () => {
    this.app.use(ErrorMiddleware.handleError);
  };

  public start = async () => {
    this.httpServer.listen(this.port, () => {
      console.log(`❤ Server running on http://localhost:${this.port}`);
      console.log(`✨ Socket.IO server initialized`);
      console.log(`🔓 CORS enabled for all origins`);
    });
  };
}
