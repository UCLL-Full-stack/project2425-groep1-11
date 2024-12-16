import { match } from 'assert';
import { MatchInput } from '../types/types';
import db from '../util/database';
import { Match } from '../model/match';

const findAll = async () => {
    try {
        const matchesPrisma = await db.match.findMany();
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


const updateMatch = async ( id: number, {homeTeamName, awayTeamName, homeScore, awayScore,date, location}: MatchInput) => {
    try {
        const matchPrisma = await db.match.update({
            where: {id},
            data: {homeTeamName, awayTeamName, homeScore, awayScore, date}
        });
        return matchPrisma;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

// const deleteMatch = async ( match_id: number) => {
//     try {
//         const matchPrisma = await db.match.delete({
//             where: { 
//                 match_id
//             }
//         });
//         return matchPrisma;
//     } catch (error) {
//         throw new Error('Database error. See server log for details.');
//     }
// }

// const addPlayerToMatch = async (match_id: number, player_id: number) => {
//     try {
//         const matchPrisma = await db.match.update({
//             where: { match_id },
//             data: {
//                 players: {
//                     connect: { id: player_id }
//                 }
//             }
//         });
//         return matchPrisma;
//     } catch (error) {
//         throw new Error('Database error. See server log for details.');
//     }
// }


export default {findAll, addMatch}