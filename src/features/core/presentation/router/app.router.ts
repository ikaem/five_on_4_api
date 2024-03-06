import { Router } from 'express';
import { MatchesRouter } from '../../../matches/presentation/router/matches.router.js';
import { AuthRouter } from '../../../auth/presentation/router/auth.router.js';

// TODO create interface for Router in general
//  - but, app can only get AppRouter
export class AppRouter {
  constructor(
    private readonly _matchesRouter: MatchesRouter,
    private readonly _authRouter: AuthRouter,
  ) {
    const appRouter = Router();

    // appRouter.use('/matches', this._matchesRouter.router);
    appRouter.use('/matches', this._matchesRouter.router);
    appRouter.use('/auth', this._authRouter.router);
    // appRouter.get('/matches', (req, res) => {
    //   res.json({ ok: true, data: 'matches' });
    // });

    this._router = appRouter;
  }

  private readonly _router: Router;

  get router(): Router {
    return this._router;
  }
}
