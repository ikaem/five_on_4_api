import { getApp } from './app.js';
import { DepenedencyInitializerWrapper } from './wrappers/dependency-initializer/dependency-initializer.wrapper.js';
import { EnvVarProviderWrapper } from './wrappers/env-var-provider/env-var/env-var-provider.wrapper.js';

export const runServer = async () => {
  const envVarProvider = new EnvVarProviderWrapper();

  // const dbWrapper = new DBWrapper(DB_DATA_SOURCE);
  // await dbWrapper.initialize();

  const depsInjector = new DepenedencyInitializerWrapper(envVarProvider);
  depsInjector.initialize();

  const appRouter = depsInjector.appRouter;

  const app = getApp(appRouter);

  const port = envVarProvider.server.port || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
