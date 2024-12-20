import { Stats } from "../model/stats";
import statsDb from "../repository/stats.db"
import { StatsInput } from "../types/types";

const addStatsToPlayer = async ( id:number , {appearances, goals, assists}: StatsInput, {email, role}: {email:string, role:string} ): Promise<Stats> => {
    return statsDb.addStatsToPlayer( id ,{appearances, goals, assists});
}

const getAllStats = async ({email}: {email:string}): Promise<Stats[]> => {
    if (!email) {
        throw new Error('decode error!');
    }

    return statsDb.getAllStats();
}

const updateStats = async (id: number, {appearances, goals, assists}: StatsInput, {email, role}: {email:string, role:string}): Promise<Stats> => {
    if (!email) {
        throw new Error('decode error!');
    }
   
    if (role == 'Player') {
        throw new Error('You are not authorized to update stats');
    }

    return statsDb.updateStats(id, {appearances, goals, assists});
}

const removeStats = async (id: number, {email, role}: {email:string, role:string}): Promise<void> => {
    if (!email) {
        throw new Error('decode error!');
    }
   
    if (role !== 'Admin') {
        throw new Error('You are not authorized to update stats');
    } 
    return statsDb.deleteStats(id);
}

export default {addStatsToPlayer, getAllStats, updateStats, removeStats};