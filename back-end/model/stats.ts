
import { Stats as StatsPrisma } from '@prisma/client';

export class Stats {
    readonly id: number;
    readonly playerId: number;
    readonly appearances: number;
    readonly goals: number;
    readonly assists: number;

    constructor(stats: {
        id: number,
        playerId: number,
        appearances: number,
        goals: number,
        assists: number
    }) {

        this.validate(stats);
        
        this.id = stats.id;
        this.playerId = stats.playerId;
        this.appearances = stats.appearances;
        this.goals = stats.goals;
        this.assists = stats.assists;
    }

    getId(): number {
        return this.id;
    }
   
    getGoals(): number {
        return this.goals;
    }

    getAssists(): number {
        return this.assists;
    }

    getAppearances(): number {
        return this.appearances;
    }
    
    getPlayerId(): number {
        return this.playerId;
    }

    validate(stats: { id: number, playerId: number, appearances: number, goals: number, assists: number }) {
        if (stats.appearances < 0) {
            throw new Error('Appearances cannot be negative.');
        }

        if (stats.goals < 0) {
            throw new Error('Goals cannot be negative.');
        }

        if (stats.assists < 0) {
            throw new Error('Assists cannot be negative.');
        }
    }

    static from({
        id,
        playerId,
        appearances,
        goals,
        assists
    }: StatsPrisma): Stats {
        return new Stats({
            id,
            playerId,
            appearances,
            goals,
            assists
        });
    }
}
