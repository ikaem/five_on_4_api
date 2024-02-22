import { Request, Response } from 'express';
import { CreateMatchUseCase } from '../../domain/use-cases/create-match.use-case.js';

export type MatchCreateDataValue = {
  name: string;
  location: string;
  organizer: string;
  // TODO just ids - for now leave empty always
  invitedPlayers: number[];
  description: string;
};

export class CreateMatchController {
  constructor(private readonly _createMatchUseCase: CreateMatchUseCase) {}

  execute = async (req: Request, res: Response) => {
    const { name, location, organizer, invitedPlayers, description } = req.body;
    // TODO some validation here
    const matchData: MatchCreateDataValue = {
      name,
      location,
      organizer,
      invitedPlayers,
      description,
    };

    const id = await this._createMatchUseCase.execute(matchData);
    res.json({ ok: true, data: id });
  };
}
