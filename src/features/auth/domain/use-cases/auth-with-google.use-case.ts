import { AuthRepository } from '../repository_interfaces/auth.repository.js';

export class AuthWithGoogleUseCase {
  constructor(private readonly _authRepository: AuthRepository) {}

  async execute(idToken: string) {
    return this._authRepository.authWithGoogle(idToken);
  }
}
