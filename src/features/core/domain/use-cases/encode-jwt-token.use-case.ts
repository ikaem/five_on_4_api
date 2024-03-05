import {
  EncodeAuthTokenArgs,
  JsonWebTokenWrapper,
} from '../../../../wrappers/libraries/jsonwebtoken/jsonwebtoken.wrapper.js';

export class EncodeJwtTokenUseCase {
  constructor(private readonly _jwtWrapper: JsonWebTokenWrapper) {}

  async execute(args: EncodeAuthTokenArgs): Promise<string | undefined> {
    return this._jwtWrapper.encodeAuthToken(args);
  }
}
