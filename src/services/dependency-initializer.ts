// TODO very simple one for now

import { AppRouter } from '../features/core/presentation/router/app.router.js';
import { MatchesImplDataSource } from '../features/matches/data/data-sources/matches/matches-impl.data-source.js';
import { MatchesImplRepository } from '../features/matches/data/repositories/matches-impl.repository.js';
import { CreateMatchUseCase } from '../features/matches/domain/use-cases/create-match.use-case.js';
import { GetMatchUseCase } from '../features/matches/domain/use-cases/get-match.use-case.js';
import { GetMatchesUseCase } from '../features/matches/domain/use-cases/get-matches.use-case.js';
import { CreateMatchController } from '../features/matches/presentation/controllers/create-match.controller.js';
import { GetMatchController } from '../features/matches/presentation/controllers/get-match.controller.js';
import { GetMatchesController } from '../features/matches/presentation/controllers/get-matches.controller.js';
import { MatchesRouter } from '../features/matches/presentation/router/matches.router.js';

export class DepenedencyInitializer {
  constructor() {} // will need env var wrapper // will need logger // will need db

  private _appRouter: AppRouter | undefined = undefined;
  get appRouter(): AppRouter {
    if (!this._appRouter) {
      throw new Error('AppRouter not initialized. Did you forget to call initialize()?');
    }

    return this._appRouter;
  }

  initialize() {
    // TODO will need to check that db is initialized later

    // data sources
    const matchesDataSource = new MatchesImplDataSource();

    // repositories
    const matchesRepository = new MatchesImplRepository(matchesDataSource);

    // use cases
    const getMatchesUseCase = new GetMatchesUseCase(matchesRepository);
    const getMatchUseCase = new GetMatchUseCase(matchesRepository);
    const createMatchUseCase = new CreateMatchUseCase(matchesRepository);

    // controllers
    const getMatchesController = new GetMatchesController(getMatchesUseCase);
    const getMatchController = new GetMatchController(getMatchUseCase);
    const createMatchController = new CreateMatchController(createMatchUseCase);

    // routers
    const matchRouter = new MatchesRouter(
      getMatchesController,
      getMatchController,
      createMatchController,
    );

    // app router
    const appRouter = new AppRouter(matchRouter);
    this._appRouter = appRouter;
  }
}
