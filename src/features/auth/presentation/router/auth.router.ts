import { Router } from 'express';
import { AuthWithGoogleController } from '../controllers/auth-with-google.controller.js';

export class AuthRouter {
  constructor(private readonly _authWithGoogleController: AuthWithGoogleController) {
    const authRouter = Router();

    authRouter.post('/google-auth', _authWithGoogleController.execute);

    this._router = authRouter;
  }

  private readonly _router: Router;

  get router(): Router {
    return this._router;
  }
}
