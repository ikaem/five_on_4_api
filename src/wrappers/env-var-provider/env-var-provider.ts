export interface EnvironmentVariablesProvider {
  get db(): EnvironmentVariablesProviderDB;
  get auth(): EnvironmentVariablesProviderAuth;
  get server(): EnvironmentVariablesProviderServer;
}

export type EnvironmentVariablesProviderDB = {
  host: string;
  port: number;
  dbName: string;
  userName: string;
  password: string;
};

export type EnvironmentVariablesProviderAuth = {
  jwtSecret: string;
};

export type EnvironmentVariablesProviderServer = {
  port: number;
};
