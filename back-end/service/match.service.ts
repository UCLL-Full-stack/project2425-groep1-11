import { Match } from "../model/match";
import matchDb from "../repository/match.db";
import { MatchInput } from "../types/types";


const getAllMatches = async (): Promise<Match[]> =>  {
    return matchDb.findAll();
}

const addMatch = async ({location, date, homeTeamName, awayTeamName, homeScore, awayScore}: MatchInput): Promise<Match> => {
    return matchDb.addMatch({location, date, homeTeamName, awayTeamName, homeScore, awayScore});
}

const updateMatch = async (id: number, {location, date, homeTeamName, awayTeamName, homeScore, awayScore}: MatchInput): Promise<Match> => {
    return matchDb.updateMatch(id, {location, date, homeTeamName, awayTeamName, homeScore, awayScore});
}

const deleteMatch = async (id: number): Promise<void> => {
    return matchDb.deleteMatch(id);
}

const addPlayerToMatch = async (id: number, player_id: number): Promise<Match> => {
    return matchDb.addPlayerToMatch(id, player_id);
}

export default {getAllMatches, addMatch, updateMatch, deleteMatch, addPlayerToMatch};