import { MatchCreateDataValue } from '../../presentation/controllers/create-match.controller.js';
import { MatchesRepository } from '../repository-interfaces/matches.repository.js';

export class CreateMatchUseCase {
  constructor(private readonly _matchesRepository: MatchesRepository) {}

  execute = async (matchData: MatchCreateDataValue): Promise<number> => {
    const matchId = await this._matchesRepository.createMatch(matchData);
    return matchId;
  };
}
