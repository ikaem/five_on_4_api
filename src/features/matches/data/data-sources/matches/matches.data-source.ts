import { MatchCreateDataValue } from '../../../presentation/controllers/create-match.controller.js';
import { MatchEntity } from '../../entities/match.entity.js';

export interface MatchesDataSource {
  getMatches(): Promise<MatchEntity[]>;
  getMatch(matchId: number): Promise<MatchEntity | null>;
  createMatch(matchData: MatchCreateDataValue): Promise<number>;
}
