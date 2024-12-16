import { Stats } from "../model/stats";
import statsDb from "../repository/stats.db"
import { StatsInput } from "../types/types";

const addStatsToPlayer = async ({playerId, appearances, goals, assists}: StatsInput): Promise<Stats> => {
    return statsDb.addStatsToPlayer({playerId, appearances, goals, assists});
}

const getAllStats = async (): Promise<Stats[]> => {
    return statsDb.getAllStats();
}

const updateStats = async (id: number, {appearances, goals, assists}: StatsInput): Promise<Stats> => {
    return statsDb.updateStats(id, {appearances, goals, assists});
}

const removeStats = async (id: number): Promise<void> => {
    return statsDb.deleteStats(id);
}

export default {addStatsToPlayer, getAllStats, updateStats, removeStats};