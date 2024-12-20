/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   schemas:
 *     Coach:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The ID of the coach.
 *         name:
 *           type: string
 *           description: The name of the coach.
 *         job:
 *           type: string
 *           description: The coach's job.
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
import coachService from '../service/coach.service';
import { CoachInput } from '../types/types';
import { decodeJwtToken } from '../util/jwt';



const coachRouter = express.Router();


/**
 * @swagger
 * /coaches:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     tags: [Coach]
 *     summary: Get all Coaches
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
 *                   $ref: '#/components/schemas/Coach'
 *       400:
 *          description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
coachRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coaches = await coachService.getAllcoaches();
        res.status(200).json(coaches);
    } catch (error) {
        next(error);
    }
})

/**
   * @swagger
   * /coaches/add:
   *   post:
   *     security: 
   *       - bearerAuth: [] 
   *     summary: Add a new Coach
   *     tags: [Player]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CoachInput'
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
coachRouter.post('/add', async (req: Request, res: Response , next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const coach = <CoachInput>req.body;
        const result = await coachService.addCoach(coach, {email, role});
        res.status(201).json( result);
    } catch (error) {
     next(error); 
    }
});

coachRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const coach = <CoachInput>req.body;
        const result = await coachService.updateCoach(id, coach, {email, role});
        res.status(200).json(result);
    } catch (error) {
     next(error);
    }
});

coachRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        await coachService.removeCoach(id, {email, role});
        res.status(200).json({status: 'success', message: 'Coach deleted successfully'});
    } catch (error) {
     next(error);
    }
});

coachRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const coach = <CoachInput>req.body;
        const id = parseInt(req.params.id);
        const result = await coachService.updateCoach(id, coach, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

// coachRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization?.slice(7);
//         if (!token) {
//             throw new Error('Authorization token is missing');
//         }
//         const {email, role} = decodeJwtToken(token);
//         const id = parseInt(req.params.id);
//         await coachService.removeCoach(id, {email, role});
//         res.status(204).end();
//     } catch (error) {
//         next(error);
//     }
// });

export { coachRouter };