import {
  CookieWrapper,
  CreateCookieArgs,
} from '../../../../wrappers/libraries/cookie/cookie.wrapper.js';

export class CreateSecureHttpOnlyCookieUseCase {
  constructor(private readonly _cookieWrapper: CookieWrapper) {}

  execute(name: string, value: string, maxAge: number): string {
    const args: CreateCookieArgs = {
      name,
      value,
      maxAge,
      secure: true,
      httpOnly: true,
    };

    return this._cookieWrapper.create(args);
  }
}
