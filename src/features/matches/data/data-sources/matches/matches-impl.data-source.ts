import { PlayerEntity } from '../../../../players/data/entities/player.entity.js';
import { MatchCreateDataValue } from '../../../presentation/controllers/create-match.controller.js';
import { MatchEntity } from '../../entities/match.entity.js';
import { MatchesDataSource } from './matches.data-source.js';

export class MatchesImplDataSource implements MatchesDataSource {
  constructor() {}
  async createMatch(matchData: MatchCreateDataValue): Promise<number> {
    const id = fakeMatches.length;
    const match = new MatchEntity(
      id,
      Date.now(),
      matchData.name,
      matchData.location,
      matchData.organizer,
      // TODO initially no players
      [],
      matchData.description,
    );

    fakeMatches.push(match);

    return id;
  }
  async getMatch(matchId: number): Promise<MatchEntity | null> {
    const match = fakeMatches.find((m) => m.id === matchId);
    if (!match) {
      // TODO null is probably good
      return null;
    }

    return match;
  }

  async getMatches(): Promise<MatchEntity[]> {
    return fakeMatches;
  }
}

const fakeMatches: MatchEntity[] = [...createTempMatchEntities(10)];

// TODO temp only
function createTempMatchEntities(count: number): MatchEntity[] {
  const matches = Array.from({ length: count }, (_, index) => {
    return new MatchEntity(
      index,
      Date.now(),
      `Match ${index}`,
      `Location ${index}`,
      `Organizer ${index}`,
      [
        new PlayerEntity(
          1,
          `Player ${index}`,
          `Nickname ${index}`,
          'https://openexpoeurope.com/wp-content/uploads/2017/05/thomas-person.jpg',
        ),
      ],
      `Description ${index}`,
    );
  });

  return matches;
}
