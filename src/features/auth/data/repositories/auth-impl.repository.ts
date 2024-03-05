import { AuthModel } from '../../domain/models/auth.model.js';
import { AuthRepository } from '../../domain/repository_interfaces/auth.repository.js';
import {
  AuthDataSource,
  AuthTypeConstants,
  CreateAuthArgs,
} from '../data-sources/auth/auth.data-source.js';
import { AuthEntity } from '../entities/auth.entity.js';

export class AuthImplRepository implements AuthRepository {
  constructor(private readonly _authDataSource: AuthDataSource) {}

  async authWithGoogle(idToken: string): Promise<AuthModel> {
    // validate token
    const googleAuthResponse = await this._authDataSource.authWithGoogle(idToken);
    // if token not valid, throw error - this should be done automatically
    // check if user exists in db
    const authEmail = googleAuthResponse.email;
    const foundAuth = await this._authDataSource.findAuthByEmail(authEmail);
    // if user exists, return user
    if (foundAuth) {
      const authModel = AuthConverter.fromEntityToModel(foundAuth);
      return authModel;
    }
    // if user does not exist, create user and return user
    const createAuthArgs: CreateAuthArgs = {
      nickname: googleAuthResponse.firstName,
      email: googleAuthResponse.email,
      avatarUrl: googleAuthResponse.avatarUrl,
      authType: AuthTypeConstants.GOOGLE,
      firstName: googleAuthResponse.firstName,
      lastName: googleAuthResponse.lastName,
      password: undefined,
    };

    const createdAuth = await this._authDataSource.createAuth(createAuthArgs);
    const authModel = AuthConverter.fromEntityToModel(createdAuth);

    return authModel;
  }
}

// TODO move to converters
export abstract class AuthConverter {
  static fromEntityToModel(entity: AuthEntity): AuthModel {
    return {
      id: entity.id,
      name: entity.name,
      nickname: entity.nickname,
      email: entity.email,
      avatarUrl: entity.avatarUrl,
    };
  }
}
