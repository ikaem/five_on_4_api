import { ValidatedGoogleAuthResponse } from '../../../../../wrappers/google-auth.js';

export interface AuthDataSource {
  authWithGoogle: (idToken: string) => Promise<ValidatedGoogleAuthResponse>;

  // databse
  findAuthByEmail: (email: string) => Promise<ValidatedGoogleAuthResponse | null>;
}
