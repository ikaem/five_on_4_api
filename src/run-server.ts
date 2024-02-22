// import { DBWrapper } from './libraries/type-orm/db-wrapper.js';
import { getApp } from './app.js';
import { DepenedencyInitializer } from './services/dependency-initializer.js';

// import DB_DATA_SOURCE from './libraries/type-orm/data-source-config.js';
// import { EnvVarWrapper } from './libraries/env-var/env-var-wrapper.js';

export const runServer = async () => {
  // TODO there should be some wrapping initializer for these - or something
  // const envVarWrapper = new EnvVarWrapper();

  // const dbWrapper = new DBWrapper(DB_DATA_SOURCE);
  // await dbWrapper.initialize();

  const depsInjector = new DepenedencyInitializer();
  depsInjector.initialize();

  const appRouter = depsInjector.appRouter;

  const app = getApp(appRouter);

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
