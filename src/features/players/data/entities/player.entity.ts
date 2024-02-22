// TODO will use typorm for this later

export class PlayerEntity {
  constructor(id: number, name: string, nickname: string, avatarUrl: string) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.avatarUrl = avatarUrl;
  }

  id: number;
  name: string;
  nickname: string;
  avatarUrl: string;
}
