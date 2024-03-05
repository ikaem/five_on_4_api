import { OAuth2Client } from 'google-auth-library';
import { EnvironmentVariablesProviderAuth } from '../../env-var-provider/env-var-provider.js';
import { GoogleAuth, ValidatedGoogleAuthResponse } from '../../google-auth.js';

export class GoogleAuthWrapper implements GoogleAuth {
  private client: OAuth2Client;

  constructor(authEnvVars: EnvironmentVariablesProviderAuth) {
    this.client = new OAuth2Client(authEnvVars.googleAuthServerId);
  }

  async verifyIdToken(idToken: string): Promise<ValidatedGoogleAuthResponse> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      // TODO I dont know what this is
      // audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      // TODO create a custom error for this
      throw new Error('Google Auth: Invalid token');
    }

    return {
      email: payload.email || '',
      firstName: payload.given_name || '',
      lastName: payload.family_name || '',
      avatarUrl: payload.picture || '',
    };
  }
}
