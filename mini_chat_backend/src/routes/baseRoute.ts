import { Application, Router } from 'express';

export class BaseRoute {
  router: Router;

  constructor(private app: Application) {
    this.router = Router();
    this.app.use('/api/miniChat', this.router);
  }
}
//http://localhost:3777/api/minichat