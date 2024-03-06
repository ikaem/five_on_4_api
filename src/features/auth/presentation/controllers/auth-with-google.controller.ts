import { Request, Response } from 'express';
import cookie from 'cookie';
import { AuthWithGoogleUseCase } from '../../domain/use-cases/auth-with-google.use-case.js';
import { EncodeJwtTokenUseCase } from '../../../core/domain/use-cases/encode-jwt-token.use-case.js';
import { EncodeAuthTokenArgs } from '../../../../wrappers/libraries/jsonwebtoken/jsonwebtoken.wrapper.js';
import { JWTTokenExpiresInConstants } from '../../../core/utils/constants/jwt-token-expires-in.constants.js';
import { CreateSecureHttpOnlyCookieUseCase } from '../../../core/domain/use-cases/create-secure-http-only-cookie.use-case.js';

export class AuthWithGoogleController {
  constructor(
    private readonly _authWithGoogleUseCase: AuthWithGoogleUseCase,
    private readonly _encodeJwtTokenUseCase: EncodeJwtTokenUseCase,
    private readonly _createSecureHttpOnlyCookieUseCase: CreateSecureHttpOnlyCookieUseCase,
  ) {}

  execute = async (req: Request, res: Response) => {
    // TODO this will need validation
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({ ok: false, message: 'No idToken provided' });
      return;
    }

    try {
      const auth = await this._authWithGoogleUseCase.execute(idToken);

      const encodeTokenArgs: EncodeAuthTokenArgs = {
        expiresIn: JWTTokenExpiresInConstants.DEFAULT_MINS_20,
        payload: auth,
      };

      const token = await this._encodeJwtTokenUseCase.execute(encodeTokenArgs);
      if (!token) {
        throw new Error('There was an issue encoding the jwt token when logging in with google');
      }

      const secureCookie = this._createSecureHttpOnlyCookieUseCase.execute(
        // TODO add this to constants or something
        'jwt_token',
        token,
        JWTTokenExpiresInConstants.DEFAULT_MINS_20,
      );

      res.setHeader('Set-Cookie', secureCookie);
      // TODO create standartized response creators
      res.status(200).json({ ok: true, message: 'Logged in with Google', data: auth });
    } catch (error) {
      console.error('Error logging in with google: ' + error);

      res.status(500).json({ ok: false, message: 'There was an issue signing in with Google' });
    }
  };
}
