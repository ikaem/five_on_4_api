import { GoogleAuth, ValidatedGoogleAuthResponse } from '../../../../../wrappers/google-auth.js';
import { AuthEntity } from '../../entities/auth.entity.js';
import { AuthDataSource, AuthTypeConstants, CreateAuthArgs } from './auth.data-source.js';

export class AuthImplDataSource implements AuthDataSource {
  constructor(private readonly googleAuth: GoogleAuth) {}
  async createAuth(authData: CreateAuthArgs): Promise<AuthEntity> {
    const auth = new AuthEntity(
      fakeAuth.length,
      authData.nickname,
      authData.firstName,
      authData.email,
      authData.avatarUrl,
      authData.password,
      authData.authType,
    );

    fakeAuth.push(auth);

    return auth;
  }
  async findAuthByEmail(email: string): Promise<AuthEntity | undefined> {
    const foundAuth = fakeAuth.find((auth) => auth.email === email);

    return foundAuth;
  }

  async authWithGoogle(idToken: string): Promise<ValidatedGoogleAuthResponse> {
    const response = await this.googleAuth.verifyIdToken(idToken);

    return response;
  }
}

const fakeAuth: AuthEntity[] = [...createTempAuthEntities()];

// TODO temp only
function createTempAuthEntities(): AuthEntity[] {
  const singleAuth = new AuthEntity(
    1,
    'karlo',
    'marinovic.karlo@gmail.com',
    'karlo',
    'https://openexpoeurope.com/wp-content/uploads/2017/05/thomas-person.jpg',
    // TODO maybe better for this to be null
    undefined,
    AuthTypeConstants.GOOGLE,
  );

  return [singleAuth];
}
