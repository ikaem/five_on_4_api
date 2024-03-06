import { ValidatedGoogleAuthResponse } from '../../../../../wrappers/google-auth.js';
import { AuthEntity } from '../../entities/auth.entity.js';

// TODO move to auth constants or something
export enum AuthTypeConstants {
  GOOGLE = 'GOOGLE',
  EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
}

// TODO move to types here
export type CreateAuthArgs = {
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  // TODO some disciminating union add later
  password: string | undefined;
  authType: AuthTypeConstants;
};

export interface AuthDataSource {
  authWithGoogle: (idToken: string) => Promise<ValidatedGoogleAuthResponse>;

  // databse
  findAuthByEmail: (email: string) => Promise<AuthEntity | undefined>;
  createAuth: (authData: CreateAuthArgs) => Promise<AuthEntity>;
}
