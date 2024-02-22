import { PlayerEntity } from '../../data/entities/player.entity.js';
import { PlayerModel } from '../../domain/models/player/player.model.js';

export abstract class PlayersConverter {
  static fromEntityToModel(player: PlayerEntity): PlayerModel {
    return {
      id: player.id,
      name: player.name,
      nickname: player.nickname,
      avatarUrl: player.avatarUrl,
    };
  }
}
