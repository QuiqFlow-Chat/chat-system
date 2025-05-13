import { Server } from '@/server';

export class App {
  constructor(private port: number) {
    this.runServer();
  }
  private runServer = async () => {
    const server = new Server(this.port);
    server.start();
  };
}

const main = async () => {
  const app = new App(3777);
};

main();
