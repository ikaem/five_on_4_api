import { Request, Response } from 'express';
import { AuthWithGoogleUseCase } from '../../domain/use-cases/auth-with-google.use-case.js';

export class LoginWithGoogleController {
  constructor(private readonly _authWithGoogleUseCase: AuthWithGoogleUseCase) {}

  async execute(req: Request, res: Response) {
    // TODO this will need validation
    const { idToken } = req.body;
    const auth = await this._authWithGoogleUseCase.execute(idToken);
    res.status(200).json(auth);
  }
}
