import 'dotenv/config';
import envVar from 'env-var';
import {
  EnvironmentVariablesProvider,
  EnvironmentVariablesProviderServer,
} from '../env-var-provider.js';

export class EnvVarProviderWrapper implements EnvironmentVariablesProvider {
  get server(): EnvironmentVariablesProviderServer {
    return {
      port: envVar.get('PORT').required().asPortNumber(),
    };
  }
  get db() {
    return {
      // host: envVar.get('DB_HOST').required().asString(),
      // port: envVar.get('DB_PORT').required().asPortNumber(),
      // dbName: envVar.get('DB_NAME').required().asString(),
      // userName: envVar.get('DB_USERNAME').required().asString(),
      // password: envVar.get('DB_PASSWORD').required().asString(),
      // TODO temp only
      host: 'host',
      port: 1234,
      dbName: 'dbName',
      userName: 'userName',
      password: 'password',
    };
  }

  get auth() {
    return {
      // jwtSecret: envVar.get('JWT_SECRET').required().asString(),
      // TODO temp only
      jwtSecret: 'jwtSecret',
      googleAuthServerId: envVar.get('GOOGLE_AUTH_SERVER_ID').required().asString(),
    };
  }
}
