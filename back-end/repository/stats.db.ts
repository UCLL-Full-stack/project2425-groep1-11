import { Stats } from '../model/stats';
import { StatsInput } from '../types/types';
import db from '../util/database';


const getAllStats = async (): Promise<Stats[]> => {
    try {
        const statsPrisma = await db.stats.findMany({
            include: {player: true}
        });
        return statsPrisma.map((statPrisma) => Stats.from(statPrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

// add a new stat to the database also add to the player
const addStatsToPlayer = async ({playerId, appearances, goals, assists}: StatsInput): Promise<Stats> => {
    try {
        const statPrisma = await db.stats.create({
            data: {
                appearances,
                goals,
                assists,
                player: {
                    connect: {id: playerId}
                }
            }
        });
        return Stats.from(statPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const updateStats = async ( id: number , { appearances, goals, assists}: StatsInput): Promise<Stats> => {
    try {
        const statPrisma = await db.stats.update({
            where: {id},
            data: { appearances, goals, assists}
        });
        return Stats.from(statPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const deleteStats = async (id: number): Promise<void> => {
    try {
        await db.stats.delete({
            where: {id}
        });
        } 
    catch (error) {
        throw new Error('Database error. See server log for details.');
}}

export default {getAllStats, addStatsToPlayer, updateStats, deleteStats};