import { Match } from "../model/match";
import matchDb from "../repository/match.db";
import { MatchInput } from "../types/types";


const getAllMatches = async (): Promise<Match[]> =>  {
    return matchDb.findAll();
}

const addMatch = async ({location, date, homeTeamName, awayTeamName, homeScore, awayScore}: MatchInput): Promise<Match> => {
    return matchDb.addMatch({location, date, homeTeamName, awayTeamName, homeScore, awayScore});
}

export default {getAllMatches, addMatch};