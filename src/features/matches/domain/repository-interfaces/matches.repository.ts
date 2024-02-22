import { MatchCreateDataValue } from '../../presentation/controllers/create-match.controller.js';
import { MatchModel } from '../models/match/match.model.js';

export interface MatchesRepository {
  getMatch(matchId: number): Promise<MatchModel | null>;
  getMatches(): Promise<MatchModel[]>;
  createMatch(matchData: MatchCreateDataValue): Promise<number>;
}
