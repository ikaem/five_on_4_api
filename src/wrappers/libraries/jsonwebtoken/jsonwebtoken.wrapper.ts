import jwt from 'jsonwebtoken';
import { JWTTokenExpiresInConstants } from '../../../features/core/utils/constants/jwt-token-expires-in.constants.js';

type DecodeAuthTokenArgs = {
  token: string;
  // secret: string;
};

export type EncodeAuthTokenArgs = {
  payload: EncodeAuthTokenPayload;
  // secret: string;
  /**  In milliseconds  */
  // expiresIn: number;
  expiresIn: JWTTokenExpiresInConstants;
};

// type EncodeAuthTokenPayload = {
//   userEmailAddress: string;
// };
type EncodeAuthTokenPayload = Record<string, object>;

export class JsonWebTokenWrapper {
  constructor(private readonly _secret: string) {}

  encodeAuthToken = (args: EncodeAuthTokenArgs): string | undefined => {
    try {
      const token = jwt.sign(
        {
          data: args.payload,
        },
        this._secret,
        {
          expiresIn: args.expiresIn,
        },
      );
      return token;
    } catch (e) {
      // TODO log properly
      console.error('There was an error signing jwt: ' + e);
      return undefined;
    }
  };

  decodeAuthToken = (args: DecodeAuthTokenArgs): { data: EncodeAuthTokenPayload } | null => {
    try {
      const decoded = jwt.verify(args.token, this._secret);

      console.log(decoded);
      // TODO not sure aboiut this
      return decoded as { data: EncodeAuthTokenPayload } | null;
    } catch (e) {
      // TODO log properly
      console.error('There was an error verifying jwt: ' + e);
      return null;
    }
  };
}
