// TODO will reuse this for typeorm
export class AuthEntity {
  constructor(id: number, nickname: string, email: string, name: string, avatarUrl: string) {
    this.id = id;
    this.nickname = nickname;
    this.email = email;
    this.name = name;
    this.avatarUrl = avatarUrl;
  }

  id: number;
  nickname: string;
  email: string;
  name: string;
  avatarUrl: string;
}
