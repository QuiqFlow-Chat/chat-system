import { Application, Router } from 'express';
import { ROUTES } from '@/constants/messages';

export class BaseRoute {
  router: Router;

  constructor(private app: Application) {
    this.router = Router();
    this.app.use(ROUTES.BASE.API_PATH, this.router);
  }
}
