import express, {Request, Response} from 'express';
import teamService from '../service/team.service';
import { MatchInput } from '../types/types';
import { Match } from '../model/match';
import matchService from '../service/match.service';


const matchRouter = express.Router()


matchRouter.get('/', async (req: Request, res: Response) => {
    try {
        const matches = await matchService.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


matchRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const match = <MatchInput>req.body;
        const result = await matchService.addMatch(match);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error); 
    }
});

export { matchRouter };