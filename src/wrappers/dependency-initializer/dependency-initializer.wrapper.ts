import { AuthImplDataSource } from '../../features/auth/data/data-sources/auth/auth-impl.data-source.js';
import { AuthImplRepository } from '../../features/auth/data/repositories/auth-impl.repository.js';
import { AuthWithGoogleUseCase } from '../../features/auth/domain/use-cases/auth-with-google.use-case.js';
import { AuthWithGoogleController } from '../../features/auth/presentation/controllers/auth-with-google.controller.js';
import { AuthRouter } from '../../features/auth/presentation/router/auth.router.js';
import { CreateSecureHttpOnlyCookieUseCase } from '../../features/core/domain/use-cases/create-secure-http-only-cookie.use-case.js';
import { EncodeJwtTokenUseCase } from '../../features/core/domain/use-cases/encode-jwt-token.use-case.js';
import { AppRouter } from '../../features/core/presentation/router/app.router.js';
import { MatchesImplDataSource } from '../../features/matches/data/data-sources/matches/matches-impl.data-source.js';
import { MatchesImplRepository } from '../../features/matches/data/repositories/matches-impl.repository.js';
import { CreateMatchUseCase } from '../../features/matches/domain/use-cases/create-match.use-case.js';
import { GetMatchUseCase } from '../../features/matches/domain/use-cases/get-match.use-case.js';
import { GetMatchesUseCase } from '../../features/matches/domain/use-cases/get-matches.use-case.js';
import { CreateMatchController } from '../../features/matches/presentation/controllers/create-match.controller.js';
import { GetMatchController } from '../../features/matches/presentation/controllers/get-match.controller.js';
import { GetMatchesController } from '../../features/matches/presentation/controllers/get-matches.controller.js';
import { MatchesRouter } from '../../features/matches/presentation/router/matches.router.js';
import { EnvironmentVariablesProvider } from '../env-var-provider/env-var-provider.js';
import { GoogleAuthWrapper } from '../google-auth/google-auth-library/google-auth.wrapper.js';
import { CookieWrapper } from '../libraries/cookie/cookie.wrapper.js';
import { JsonWebTokenWrapper } from '../libraries/jsonwebtoken/jsonwebtoken.wrapper.js';

export class DepenedencyInitializerWrapper {
  constructor(private readonly envVarProviderWrapper: EnvironmentVariablesProvider) {} // will need env var wrapper // will need logger // will need db

  private _appRouter: AppRouter | undefined = undefined;
  get appRouter(): AppRouter {
    if (!this._appRouter) {
      throw new Error('AppRouter not initialized. Did you forget to call initialize()?');
    }

    return this._appRouter;
  }

  initialize() {
    // TODO will need to check that db is initialized later

    // wrappers
    const googleAuthWrapper = new GoogleAuthWrapper(this.envVarProviderWrapper.auth);
    const jsonWebTokenWrapper = new JsonWebTokenWrapper(this.envVarProviderWrapper.auth.jwtSecret);
    const cookieWrapper = new CookieWrapper();

    // data sources
    const matchesDataSource = new MatchesImplDataSource();
    const authDataSource = new AuthImplDataSource(googleAuthWrapper);

    // repositories
    const matchesRepository = new MatchesImplRepository(matchesDataSource);
    const authRepository = new AuthImplRepository(authDataSource);

    // use cases
    const getMatchesUseCase = new GetMatchesUseCase(matchesRepository);
    const getMatchUseCase = new GetMatchUseCase(matchesRepository);
    const createMatchUseCase = new CreateMatchUseCase(matchesRepository);
    const authWithGoogleUseCase = new AuthWithGoogleUseCase(authRepository);

    const encodeJwtTokenUseCase = new EncodeJwtTokenUseCase(jsonWebTokenWrapper);
    const createSecureHttpOnlyCookieUseCase = new CreateSecureHttpOnlyCookieUseCase(cookieWrapper);

    // controllers
    const getMatchesController = new GetMatchesController(getMatchesUseCase);
    const getMatchController = new GetMatchController(getMatchUseCase);
    const createMatchController = new CreateMatchController(createMatchUseCase);
    const authWithGoogleController = new AuthWithGoogleController(
      authWithGoogleUseCase,
      encodeJwtTokenUseCase,
      createSecureHttpOnlyCookieUseCase,
    );

    // routers
    const matchRouter = new MatchesRouter(
      getMatchesController,
      getMatchController,
      createMatchController,
    );
    const authRouter = new AuthRouter(authWithGoogleController);

    // app router
    const appRouter = new AppRouter(matchRouter, authRouter);
    this._appRouter = appRouter;
  }
}
