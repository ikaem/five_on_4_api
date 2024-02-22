import { PlayerModel } from '../../../../players/domain/models/player/player.model.js';

export type MatchModel = {
  id: number;
  date: number;
  name: string;
  location: string;
  organizer: string;
  arrivingPlayers: PlayerModel[];
  description: string;
};
