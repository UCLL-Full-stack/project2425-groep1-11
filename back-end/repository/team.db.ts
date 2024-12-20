import { Team } from '../model/team';
import { TeamInput } from '../types/types';
import db from '../util/database';

const findAll = async (): Promise<Team[]> => {
    try {
        const teamsPrisma = await db.team.findMany({
            include: {homeMatches: true, awayMatches: true}
        });
        return teamsPrisma.map((teamPrisma) => Team.from(teamPrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}



const findById = async (id: number): Promise<Team | undefined> => {
    try {
        const teamPrisma = await db.team.findUnique({
            where: {id},
        });
        return  teamPrisma ? Team.from(teamPrisma) : undefined;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const addTeam = async ({name}: TeamInput) => {
    try {
        const teamPrisma = await db.team.create({
            data: {name}
        });
        return Team.from(teamPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const updateTeam = async ( id: number, {name}: TeamInput) => {
    try {
        const teamPrisma = await db.team.update({
            where: {id},
            data: {name}
        });
        return Team.from(teamPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const deleteTeam = async (id: number): Promise<void> => {
    try {
        await db.team.delete({
            where: {id}
        });
        
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const addCoachToTeam = async (id: number, coach_id: number) => {
    try {
        const teamPrisma = await db.team.update({
            where: {id},
            data: {
                coaches: {
                    connect: { id: coach_id }
                }
            }
        });
        return Team.from(teamPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

export default {findAll, findById, addTeam, updateTeam, deleteTeam, addCoachToTeam};

