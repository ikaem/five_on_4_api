import { Request, Response } from 'express';
import { GetMatchesUseCase } from '../../domain/use-cases/get-matches.use-case.js';

export class GetMatchesController {
  constructor(private readonly _getMatchesUseCase: GetMatchesUseCase) {}

  execute = async (req: Request, res: Response) => {
    const matches = await this._getMatchesUseCase.execute();
    res.json({ ok: true, data: matches });
  };
}
