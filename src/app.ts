import express from 'express';
import { AppRouter } from './features/core/presentation/router/app.router.js';

export const getApp = (appRouter: AppRouter) => {
  const app = express();
  app.use(express.json());
  app.use('/api', appRouter.router);

  return app;
};
