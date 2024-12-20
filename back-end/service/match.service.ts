import { Match } from "../model/match";
import matchDb from "../repository/match.db";
import { MatchInput } from "../types/types";


const getAllMatches = async ({email}: {email:string}): Promise<Match[]> =>  {

    if (!email) {
        throw new Error('Cooked token not found');
    }

    return matchDb.findAll();
}

const addMatch = async ({location, date, homeTeamName, awayTeamName, homeScore, awayScore}: MatchInput, {email, role}: {email:string, role: string} ): Promise<Match> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to add a match');
    }

    return matchDb.addMatch({location, date, homeTeamName, awayTeamName, homeScore, awayScore});
}

const updateMatch = async (id: number, {location, date, homeTeamName, awayTeamName, homeScore, awayScore}: MatchInput, {email, role}: {email:string, role: string} ): Promise<Match> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to update a match');
    }

    return matchDb.updateMatch(id, {location, date, homeTeamName, awayTeamName, homeScore, awayScore});
}

const deleteMatch = async (id: number, {email, role}: {email:string, role: string} ): Promise<void> => {

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to delete a match');
    }
    return matchDb.deleteMatch(id);
}

const addPlayerToMatch = async (matchId: number, player_ids: number[], {email, role}: {email:string, role: string} ): Promise<Match[]> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role == 'Player') {
        throw new Error('Only admin has the permission to add a player to a match');
    }

    const addedPlayers = await Promise.all(
        player_ids.map((playerId) => matchDb.addPlayerToMatch(matchId, playerId)) // Pass individual playerId
    );
    return addedPlayers;
};

const getMatchById = async (id: number): Promise<Match> => {
    return matchDb.getMatchById(id);
}



export default {getAllMatches, addMatch, updateMatch, deleteMatch, addPlayerToMatch, getMatchById};