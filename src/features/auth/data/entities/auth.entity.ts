// TODO will reuse this for typeorm
export class AuthEntity {
  constructor(
    id: number,
    nickname: string,
    email: string,
    name: string,
    avatarUrl: string,
    password: string | undefined,
    authType: string,
  ) {
    this.id = id;
    this.nickname = nickname;
    this.email = email;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.password = password;
    this.authType = authType;
  }

  id: number;
  nickname: string;
  email: string;
  name: string;
  avatarUrl: string;
  password: string | undefined;
  authType: string;
}
