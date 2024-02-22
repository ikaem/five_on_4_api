import { MatchModel } from '../../domain/models/match/match.model.js';
import { MatchesRepository } from '../../domain/repository-interfaces/matches.repository.js';
import { MatchCreateDataValue } from '../../presentation/controllers/create-match.controller.js';
import { MatchesConverter } from '../../utils/converters/matches.converter.js';
import { MatchesDataSource } from '../data-sources/matches/matches.data-source.js';

export class MatchesImplRepository implements MatchesRepository {
  constructor(private readonly _dataSource: MatchesDataSource) {}
  async createMatch(matchData: MatchCreateDataValue): Promise<number> {
    const id = this._dataSource.createMatch(matchData);
    return id;
  }
  async getMatch(matchId: number): Promise<MatchModel | null> {
    const matchEntity = await this._dataSource.getMatch(matchId);
    if (!matchEntity) {
      return null;
    }

    const matchModel = MatchesConverter.fromEntityToModel(matchEntity);
    return matchModel;
  }

  async getMatches(): Promise<MatchModel[]> {
    const matchEntities = await this._dataSource.getMatches();

    const matchModesl = matchEntities.map(MatchesConverter.fromEntityToModel);
    return matchModesl;
  }
}
