import { GoogleAuth, ValidatedGoogleAuthResponse } from '../../../../../wrappers/google-auth.js';
import { AuthDataSource } from './auth.data-source.js';

export class AuthImplDataSource implements AuthDataSource {
  constructor(private readonly googleAuth: GoogleAuth) {}
  async findAuthByEmail(email: string): Promise<ValidatedGoogleAuthResponse | null> {}

  async authWithGoogle(idToken: string): Promise<ValidatedGoogleAuthResponse> {
    const response = await this.googleAuth.verifyIdToken(idToken);

    return response;
  }
}
