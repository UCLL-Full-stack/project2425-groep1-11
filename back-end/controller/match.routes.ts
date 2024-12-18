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

matchRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const match = <MatchInput>req.body;
        const result = await matchService.updateMatch(id, match);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error}); 
    }
});

matchRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await matchService.deleteMatch(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


matchRouter.post('/:id/match/:player_id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const player_id = parseInt(req.params.player_id);
        const result = await matchService.addPlayerToMatch(id, player_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})

export { matchRouter };