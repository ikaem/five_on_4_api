import { AuthModel } from '../models/auth.model.js';

export interface AuthRepository {
  authWithGoogle(idToken: string): Promise<AuthModel>;
}
