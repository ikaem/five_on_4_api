import { PlayersConverter } from '../../../players/utils/converters/players.converter.js';
import { MatchEntity } from '../../data/entities/match.entity.js';
import { MatchModel } from '../../domain/models/match/match.model.js';

export abstract class MatchesConverter {
  static fromEntityToModel(match: MatchEntity): MatchModel {
    const arrivingPlayers = match.arrivingPlayers.map(PlayersConverter.fromEntityToModel);

    return {
      id: match.id,
      date: match.date,
      name: match.name,
      location: match.location,
      organizer: match.organizer,
      arrivingPlayers: arrivingPlayers,
      description: match.description,
    };
  }
}
