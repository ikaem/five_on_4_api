import { Request, Response } from 'express';
import { GetMatchUseCase } from '../../domain/use-cases/get-match.use-case.js';

export class GetMatchController {
  constructor(private readonly _getMatchUseCase: GetMatchUseCase) {}

  execute = async (req: Request, res: Response) => {
    const id = req.params.id;
    // TODO some validation here
    const matchId = parseInt(id);

    const match = await this._getMatchUseCase.execute(matchId);
    // TODO make type for response
    res.json({ ok: true, data: match });
  };
}
