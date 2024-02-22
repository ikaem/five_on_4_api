// TODO this will be using typeorm later

import { PlayerEntity } from '../../../players/data/entities/player.entity.js';

// Entity("Match")
export class MatchEntity {
  constructor(
    id: number,
    date: number,
    name: string,
    location: string,
    organizer: string,
    // TODO for now let it be string, later it will be PlayerEntity[]
    arrivingPlayers: PlayerEntity[],
    description: string,
  ) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.location = location;
    this.organizer = organizer;
    this.arrivingPlayers = arrivingPlayers;
    this.description = description;
  }

  // @PrimaryGeneratedColumn()
  id: number;
  date: number;
  name: string;
  location: string;
  organizer: string;
  // TODO for now let it be string, later it will be PlayerEntity[]
  arrivingPlayers: PlayerEntity[];
  description: string;
}
