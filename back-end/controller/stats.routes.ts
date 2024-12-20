/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Stats:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The ID of the stats.
 *         appearance:
 *           type: number
 *           format: int64
 *           description: The number of appearances made by the player.
 *         goals:
 *           type: number
 *           format: int64
 *           description: The number of goals scored by the player.
 *         assists:
 *           type: number
 *           format: int64
 *           description: The number of assists provided by the player.
 *         player:
 *           type: object
 *           description: The player who owns the stats.
 *     StatsInput:
 *       type: object
 *       properties:
 *         appearance:
 *           type: number
 *           format: int64
 *           description: The number of appearances made by the player.
 *         goals:
 *           type: number
 *           format: int64
 *           description: The number of goals scored by the player.
 *         assists:
 *           type: number
 *           format: int64
 *           description: The number of assists provided by the player.
 */


import { NextFunction, Router } from "express";
import express, {Request, Response} from 'express';
import statsService from "../service/stats.service";
import { StatsInput } from "../types/types";
import { decodeJwtToken } from "../util/jwt";



const statsRouter = express.Router();




// get all stats swagger
/**
 * @swagger
 * /stats:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     tags: [Stats]
 *     summary: Get all stats
 *     responses:
 *       200:
 *         description: All stats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stats'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
statsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
       const stats = await statsService.getAllStats({email});
        res.status(200).json(stats); 
    } catch (error) {
        next(error);
    }
});


// add stats swagger
/**
 * @swagger
 * /stats/add/{id}:
 *   post:
 *     security: 
 *       - bearerAuth: [] 
 *     tags: [Stats]
 *     summary: Add stats to a player
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The player's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatsInput'
 *     responses:
 *       201:
 *         description: Stats added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stats'
 *       500:
 *         description: Internal Server Error
 */
statsRouter.post('/add/:id', async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const stats = <StatsInput>req.body;
        const result = await statsService.addStatsToPlayer(id ,stats, {email, role});
        res.status(201).json(result);
    } catch (error) {
       next(error);
    }
});


// update stats swagger
/**
 * @swagger
 * /stats/update/{id}:
 *   put:
 *     security: 
 *       - bearerAuth: [] 
 *     tags: [Stats]
 *     summary: Update stats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The stats id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatsInput'
 *     responses:
 *       201:
 *         description: Stats updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stats'
 *       500:
 *         description: Internal Server Error
 */
statsRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const stats = <StatsInput>req.body;
        const result = await statsService.updateStats(id, stats, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});


// delete stats swagger
/**
 * @swagger
 * /stats/delete/{id}:
 *   delete:
 *     security: 
 *       - bearerAuth: [] 
 *     tags: [Stats]
 *     summary: Delete stats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The stats id
 *     responses:
 *       200:
 *         description: Stats deleted successfully
 *       500:
 *         description: Internal Server Error
 */
statsRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await statsService.removeStats(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})


export { statsRouter };