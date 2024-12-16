import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import playerRouter from './controller/player.routes';
import { userRouter } from './controller/user.routes';
import { statsRouter } from './controller/stats.routes';
import { teamRouter } from './controller/team.routes';
import { coachRouter } from './controller/coach.routes';
import { matchRouter } from './controller/match.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/players', playerRouter);
app.use('/users', userRouter);
app.use('/stats', statsRouter);
app.use('/teams', teamRouter);
app.use('/coaches', coachRouter);
app.use('/matches', matchRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
