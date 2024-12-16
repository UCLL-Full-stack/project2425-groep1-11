import { CoachInput } from '../types/types';
import db from '../util/database';


const findAll = async () => {
    try {
        const teamsPrisma = await db.team.findMany();
        return teamsPrisma;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const addCoach = async ({ name, job }: CoachInput) => {
    try {
        const coachPrisma = await db.coach.create({
            data: { name, job }
        });
        return coachPrisma;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const removeCoach = async (id: number):  Promise<void> => {
    try {
        await db.coach.delete({
            where: { id }
        });
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

export default { findAll, addCoach , removeCoach};