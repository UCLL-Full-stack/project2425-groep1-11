import { match } from 'assert';
import { MatchInput } from '../types/types';
import db from '../util/database';
import { Match } from '../model/match';

const findAll = async () => {
    try {
        const matchesPrisma = await db.match.findMany({
            include: {players: true}
        });
        return matchesPrisma.map((matchPrisma) => Match.from(matchPrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

// 

const addMatch = async ({homeTeamName, awayTeamName, homeScore, awayScore,date, location}: MatchInput) => {
    try {
        const matchPrisma = await db.match.create({
            data: {location , date, homeTeamName, awayTeamName, homeScore, awayScore }
        });
        return Match.from(matchPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}


const updateMatch = async ( id: number, {homeTeamName, awayTeamName, homeScore, awayScore,date, location}: MatchInput): Promise<Match> => {
    try {
        const matchPrisma = await db.match.update({
            where: {id},
            data: {homeTeamName, awayTeamName, homeScore, awayScore, date, location}
        });
        return Match.from(matchPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const deleteMatch = async ( id: number): Promise<void> => {
    try {
         await db.match.delete({
            where: { 
                id
            }
        });
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const addPlayerToMatch = async (id: number, player_id: number): Promise<Match> => {
    try {
        const matchPrisma = await db.match.update({
            where: { id },
            data: {
                players: {
                    connect: { id: player_id }
                }
            }
        });
        return Match.from(matchPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}


export default {findAll, addMatch, updateMatch, deleteMatch, addPlayerToMatch};