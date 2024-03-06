import {
  DecodeAuthTokenArgs,
  JsonWebTokenWrapper,
} from '../../../../wrappers/libraries/jsonwebtoken/jsonwebtoken.wrapper.js';

export class DecodeJwtTokenUseCase {
  constructor(private readonly _jwtWrapper: JsonWebTokenWrapper) {}

  async execute(args: DecodeAuthTokenArgs): Promise<Record<string, object> | undefined> {
    const result = this._jwtWrapper.decodeAuthToken(args);
    if (!result) {
      return undefined;
    }

    return result.data;
  }
}
