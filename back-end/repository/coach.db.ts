import { Coach } from '../model/coach';
import { CoachInput } from '../types/types';
import db from '../util/database';


const findAll = async (): Promise<Coach[]> => {
    try {
        const coachesPrisma = await db.coach.findMany();
        return coachesPrisma.map((coachPrisma) => Coach.from(coachPrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const addCoach = async ({ name, job, imageUrl }: CoachInput): Promise<Coach> => {
    try {
        const coachPrisma = await db.coach.create({
            data: { name, job, teamId: 1 , imageUrl}
        });
        return Coach.from(coachPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const updateCoach = async (id: number, { name, job, imageUrl }: CoachInput): Promise<Coach> => {
    try {
        const coachPrisma = await db.coach.update({
            where: { id },
            data: { name , job, imageUrl }
        });
        return Coach.from(coachPrisma);
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

export default { findAll, addCoach , removeCoach, updateCoach };