import { Router } from "express";
import express, {Request, Response} from 'express';
import statsService from "../service/stats.service";
import { StatsInput } from "../types/types";



const statsRouter = Router();


statsRouter.get('/', async (req: Request, res: Response) => {
    try {
       const stats = await statsService.getAllStats();
        res.status(200).json(stats); 
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
});


statsRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const stats = <StatsInput>req.body;
        const result = await statsService.addStatsToPlayer(stats);
        res.status(201).json({status: 'success', message: result});
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error}); 
    }
});

statsRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const stats = <StatsInput>req.body;
        const result = await statsService.updateStats(id, stats);
        res.status(201).json({status: 'success', message: result});
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error}); 
    }
});

statsRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await statsService.removeStats(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


export { statsRouter };