/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The ID of the player.
 *         name:
 *           type: string
 *           description: The name of the player.
 *         position:
 *           type: string
 *           description: The player's position.
 *         number:
 *           type: number
 *           format: int64
 *           description: The player's jersey number.
 *         birthdate:
 *           type: date
 *           format: date
 *           description: The player's birthdate.
 *         imageUrl:
 *           type: string
 *           description: The player's image URL.
 *      
 *     PlayerInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the player.
 *         position:
 *           type: string
 *           description: The player's position.
 *         number:
 *           type: number
 *           format: int64
 *           description: The player's jersey number.
 *         birthdate:
 *           type: date
 *           format: date
 *           description: The player's birthdate.
 *         imageUrl:
 *           type: string
 *           description: The player's image URL.
 */

import express, {NextFunction, Request, Response} from 'express';
import playerService from '../service/player.service';
import { PlayerInput } from '../types/types';
import statsService from '../service/stats.service';
import { decodeJwtToken } from '../util/jwt';
 

const playerRouter = express.Router();


/**
 * @swagger
 * /players:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     tags: [Player]
 *     summary: Get all players
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *               content:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Player'
 *       400:
 *          description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
playerRouter.get('/', async (req: Request , res: Response , next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const players = await playerService.getAllPlayers({email});
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
})


/**
   * @swagger
   * /players/{id}:
   *   get:
   *     security:
   *       - bearerAuth: []
   *     tags: [Player]
   *     summary: Find a player by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: The player's id
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Player'
   *       500:
   *         description: Internal Server Error
   */
playerRouter.get('/:id', async (req: Request , res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const player = await playerService.getPlayerById(id, {email});
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
})


/**
   * @swagger
   * /players/add:
   *   post:
   *     security: 
   *       - bearerAuth: [] 
   *     summary: Add a new player
   *     tags: [Player]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Player'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Player'
   *       500:
   *         description: Internal Server Error
   */
playerRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const player = <PlayerInput>req.body;
        const result = await playerService.addPlayer(player, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

 /**
 * @swagger
 * /player/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: delete a player
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Bad request. Player Id does not exist.
 */
playerRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await playerService.RemovePlayer(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})



/**
   * @swagger
   * /players/update/{id}/:
   *   put:
   *     security:
   *       - bearerAuth: []
   *     tags: [Player]
   *     summary: Update player's details.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: id of the player to retrieve.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *            schema:
   *              $ref: '#/components/schemas/PlayerInput'    
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Player'
   *       500:
   *         description: Internal Server Error
   */
playerRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {   
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
      const id = parseInt(req.params.id);
      const { name, number, position, birthdate, stat } = req.body;
  
      const updatedPlayer = await playerService.updatePlayer(id, {
        name,
        number,
        position,
        birthdate,
      }, { email, role });
  
      if (stat && stat.id) {
        await statsService.updateStats(stat.id, {
          appearances: stat.appearances,
          goals: stat.goals,
          assists: stat.assists,
        }, { email, role });
      }
  
      res.status(200).json(updatedPlayer);
    } catch (error) {
        next(error); 
    }
  });
  

export default playerRouter;