import { serialize } from 'cookie';

export type CreateCookieArgs = {
  name: string;
  value: string;
  maxAge: number;
  secure: boolean;
  httpOnly: boolean;
};

export class CookieWrapper {
  create = (args: CreateCookieArgs) => {
    const cookie = serialize(args.name, args.value, {
      maxAge: args.maxAge,
      secure: args.secure,
      httpOnly: args.httpOnly,
    });

    return cookie;
  };

  // TODO create a method to parse cookies
}
