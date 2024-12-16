import { te } from 'date-fns/locale';
import express, {Request, Response} from 'express';
import teamService from '../service/team.service';
import { TeamInput } from '../types/types';


const teamRouter = express.Router();


teamRouter.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


teamRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const team = <TeamInput>req.body;
        const result = await teamService.addTeam(team);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error}); 
    }
});

export { teamRouter };