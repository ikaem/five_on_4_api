import { MatchModel } from '../models/match/match.model.js';
import { MatchesRepository } from '../repository-interfaces/matches.repository.js';

export class GetMatchesUseCase {
  constructor(private readonly _matchesRepository: MatchesRepository) {}

  execute = async (): Promise<MatchModel[]> => {
    const matches = await this._matchesRepository.getMatches();
    return matches;
  };
}
