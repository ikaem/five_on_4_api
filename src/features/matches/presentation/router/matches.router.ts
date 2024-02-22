import { Router } from 'express';
import { GetMatchesController } from '../controllers/get-matches.controller.js';
import { GetMatchController } from '../controllers/get-match.controller.js';
import { CreateMatchController } from '../controllers/create-match.controller.js';

export class MatchesRouter {
  constructor(
    private readonly _getMatchesController: GetMatchesController,
    private readonly _getMatchController: GetMatchController,
    private readonly _createMatchController: CreateMatchController,
  ) {
    const matchesRouter = Router();

    matchesRouter.get('/', _getMatchesController.execute);
    matchesRouter.get('/:id', _getMatchController.execute);
    matchesRouter.post('/', _createMatchController.execute);
    this._router = matchesRouter;
  }

  private readonly _router: Router;

  get router(): Router {
    return this._router;
  }
}
