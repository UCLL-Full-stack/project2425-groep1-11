

import express, {Request, Response} from 'express';
import playerService from '../service/player.service';
import exp from 'constants';
import { PlayerInput } from '../types/types';
import statsService from '../service/stats.service';
 

const playerRouter = express.Router();

playerRouter.get('/', async (req: Request, res: Response) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})

playerRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const player = await playerService.getPlayerById(id);
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})

playerRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const player = <PlayerInput>req.body;
        const result = await playerService.addPlayer(player);
        res.status(201).json({status: 'success', message: result});
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error}); 
    }
});


playerRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await playerService.RemovePlayer(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


playerRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, number, position, birthdate, stat } = req.body;
  
      const updatedPlayer = await playerService.updatePlayer(id, {
        name,
        number,
        position,
        birthdate,
      });
  
      if (stat && stat.id) {
        await statsService.updateStats(stat.id, {
          appearances: stat.appearances,
          goals: stat.goals,
          assists: stat.assists,
        });
      }
  
      res.status(200).json(updatedPlayer);
    } catch (error) {
      res.status(500).json({ error: "Failed to update player and stats" });
    }
  });
  

export default playerRouter;