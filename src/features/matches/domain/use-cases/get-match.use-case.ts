import { MatchModel } from '../models/match/match.model.js';
import { MatchesRepository } from '../repository-interfaces/matches.repository.js';

export class GetMatchUseCase {
  constructor(private readonly _matchesRepository: MatchesRepository) {}

  execute = async (matchId: number): Promise<MatchModel | null> => {
    const match = await this._matchesRepository.getMatch(matchId);
    return match;
  };
}
