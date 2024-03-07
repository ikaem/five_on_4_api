import { Request, Response } from 'express';
import { GetMatchesUseCase } from '../../domain/use-cases/get-matches.use-case.js';
import { CreateSecureHttpOnlyCookieUseCase } from '../../../core/domain/use-cases/create-secure-http-only-cookie.use-case.js';
import { JWT } from 'google-auth-library';
import { JWTTokenExpiresInConstants } from '../../../core/utils/constants/jwt-token-expires-in.constants.js';

export class GetMatchesController {
  constructor(
    private readonly _getMatchesUseCase: GetMatchesUseCase,
    private readonly _createSecureHttpOnlyCookieUseCase: CreateSecureHttpOnlyCookieUseCase,
  ) {}

  execute = async (req: Request, res: Response) => {
    try {
      const matches = await this._getMatchesUseCase.execute();

      // TODO just test this
      const secureCookie = this._createSecureHttpOnlyCookieUseCase.execute(
        'jwt_token',
        'test-token',
        JWTTokenExpiresInConstants.DEFAULT_MINS_20,
      );

      res.setHeader('Set-Cookie', secureCookie);
      res.json({ ok: true, data: matches, message: 'Matches retrieved' });
    } catch (error) {
      console.error('Error getting matches: ' + error);

      res.status(500).json({ ok: false, message: 'There was an issue getting the matches' });
    }
  };
}
