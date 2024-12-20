// swagger for match.routes.ts
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         gameId:
 *           type: number
 *           description: The ID of the game.
 *         homeTeam:
 *           type: string
 *           description: The name of the home team.
 *         homeScore:
 *           type: number
 *           description: The score of the home team (optional).
 *         awayScore:
 *           type: number
 *           description: The score of the away team (optional).
 *         awayTeam:
 *           type: string
 *           description: The name of the away team.
 *         location:
 *           type: string
 *           description: The location of the game.
 *         time:
 *           type: string
 *           format: date-time
 *           description: The date and time of the game.
 *         status:
 *           type: string
 *           description: The status of the game.
 */




import express, {NextFunction, Request, Response} from 'express';
import teamService from '../service/team.service';
import { MatchInput } from '../types/types';
import { Match } from '../model/match';
import matchService from '../service/match.service';
import { match } from 'assert';
import { decodeJwtToken } from '../util/jwt';


const matchRouter = express.Router()


// swagger get all matches
/**
 * @swagger
 * /matches:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     tags: [Match]
 *     summary: Retrieve all matches
 *     responses:
 *       200:
 *         description: A list of matches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
matchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const matches = await matchService.getAllMatches({email});
        res.status(200).json(matches);
    } catch (error) {
       next(error);
    }
})


// swagger add match
/**
 * @swagger
 * /matches/add:
 *   post:
 *     security: 
 *       - bearerAuth: [] 
 *     summary: Add a new Match
 *     tags: [Match]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       500:
 *         description: Internal Server Error
 */
matchRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const match = <MatchInput>req.body;
        const result = await matchService.addMatch(match, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});


// swagger update match
/**
 * @swagger
 * /matches/update/{id}:
 *   put:
 *     security: 
 *       - bearerAuth: [] 
 *     tags: [Match]
 *     summary: Update a match
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The match's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchInput'
 *     responses:
 *       201:
 *         description: Match updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       500:
 *         description: Internal Server Error
 */
matchRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const match = <MatchInput>req.body;
        const result = await matchService.updateMatch(id, match, {email, role});
        res.status(201).json(result);
    } catch (error) {
       next(error);
    }
});


// swagger delete match
/**
 * @swagger
 * /matches/delete/{id}:
 *   delete:
 *     security: 
 *       - bearerAuth: [] 
 *     tags: [Match]
 *     summary: Delete a match by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the match to delete
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Match deleted successfully
 *       500:
 *         description: Internal Server Error
 */
matchRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await matchService.deleteMatch(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

// swagger add list of ids
/**
 * @swagger
 * /matches/{id}/players:
 *   post:
 *     security: 
 *       - bearerAuth: [] 
 *     tags: [Match]
 *     summary: Add a list of players to a match
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the match to add players to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player_ids:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Players added to match successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Players added to match successfully
 *       500:
 *         description: Internal Server Error
 */
matchRouter.post('/:id/players', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        console.log("Received request body:", req.body); // Debugging input
        const id = parseInt(req.params.id);
        const player_ids: number[] = req.body.player_ids;

        if (!Array.isArray(player_ids)) {
            throw new Error("player_ids must be an array");
        }

        const result = await matchService.addPlayerToMatch(id, player_ids, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});


// swagger get list of players
/**
 * @swagger
 * /matches/{id}/players:
 *   get:
 *     security: 
 *       - bearerAuth: [] 
 *     tags: [Match]
 *     summary: Get a list of players in a match
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the match to get players from
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
matchRouter.get('/:id/players', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const match = await matchService.getMatchById(id);
      if (!match) throw new Error("Match not found");
      res.status(200).json(match.players);
    } catch (error) {
      next(error);
    }
  });
  



export { matchRouter };