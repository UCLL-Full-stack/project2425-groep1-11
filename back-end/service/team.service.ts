import { Team } from "../model/team";
import teamDb from "../repository/team.db"
import { TeamInput } from "../types/types";


const getAllTeams = async (): Promise<Team[]> => {
    return teamDb.findAll();
}


const addTeam = async ({name}: TeamInput) => {
    return teamDb.addTeam({name});
}


export default { getAllTeams, addTeam }; 