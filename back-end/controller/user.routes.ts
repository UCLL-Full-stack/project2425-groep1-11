// user schema routes
 
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object 
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: The ID of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role: 
 *           type: string
 *           description: The role of the user.    
 *     UserInput:
 *       type: object 
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role: 
 *           type: string
 *           description: The role of the user. 
 * 
 *     LogInput:
 *       type: object 
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 */


import express, {NextFunction, Request, Response} from 'express';
import playerService from '../service/player.service';
import { LogInput, UserInput } from '../types/types';
import userService from '../service/user.service';


const userRouter = express.Router();

// get all users swagger
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
})


/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.post('/signup', async (req: Request, res: Response , next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogInput'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.post('/login', async (req: Request , res: Response, next: NextFunction) => {
    try {
        const user = <LogInput>req.body;
        const response = await userService.authenticate(user);
        res.status(200).json({ message: 'User authenticated', ...response});
    } catch (error) {
        next(error);
    }
})



export { userRouter };