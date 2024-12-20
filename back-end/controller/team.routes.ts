/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The ID of the team.
 *         name:
 *           type: string
 *           description: The name of the team.
 *         goalsFor:
 *           type: number
 *           format: int64
 *           description: The number of goals scored by the team.
 *         goalsAg:
 *           type: number
 *           format: int64
 *           description: The number of goals conceded by the team.
 *         points:
 *           type: number
 *           format: int64
 *           description: The number of points earned by the team.    
 *         players:
 *           type: array
 *           description: The players of the team.
 *         homeMatches:
 *           type: array
 *           description: The home games of the team.
 *         awayMatches:
 *           type: array
 *           description: The away games of the team.
 *     TeamInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the team.
 */


import express, {NextFunction, Request, Response} from 'express';
import teamService from '../service/team.service';
import { TeamInput } from '../types/types';
import { decodeJwtToken } from '../util/jwt';


const teamRouter = express.Router();



/**
 * @swagger
 * /teams:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     summary: Retrieve all teams
 *     responses:
 *       '200':
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succes:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 content:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad Request
 * 
 *       500:
 *         description: Internal Server Error 
 * 
 * 
 */
teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const teams = await teamService.getAllTeams({email});
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
})



/**
 * @swagger
 * /teams/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     summary: Add a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInput'
 *     responses:
 *       '201':
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
teamRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const team = <TeamInput>req.body;
        const result = await teamService.addTeam(team, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});



/**
 * @swagger
 * /teams/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     summary: Update a team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the team to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInput'
 *     responses:
 *       '201':
 *         description: Team updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
teamRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const team = <TeamInput>req.body;
        const result = await teamService.updateTeam(id, team, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});


/**
 * @swagger
 * /teams/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     summary: Delete a team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the team to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Team deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
teamRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await teamService.deleteTeam(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

export { teamRouter };