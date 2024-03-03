import express from 'express';
import cors from 'cors';
import { AppRouter } from './features/core/presentation/router/app.router.js';
import { EnvironmentVariablesProvider } from './wrappers/env-var-provider/env-var-provider.js';

export const getApp = (appRouter: AppRouter) => {
  const app = express();
  app.use(
    cors({
      // TDOO test
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use('/api', appRouter.router);

  return app;
};
