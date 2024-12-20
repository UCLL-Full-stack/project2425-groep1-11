import { Team } from "../model/team";
import teamDb from "../repository/team.db"
import { TeamInput } from "../types/types";


const getAllTeams = async ({email}: {email:string}): Promise<Team[]> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    return teamDb.findAll();
}


const addTeam = async ({name}: TeamInput, {email, role}: {email:string, role: string}): Promise<Team> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to add a team');
    }
    return teamDb.addTeam({name});
}

const updateTeam = async (id: number, {name}: TeamInput, {email, role}: {email:string, role: string} ) => {

    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to add a team');
    }

    return teamDb.updateTeam(id, {name});
}

const deleteTeam = async (id: number, {email, role}: {email:string, role: string}) => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to add a team');
    }


    return teamDb.deleteTeam(id);
}


export default { getAllTeams, addTeam, updateTeam, deleteTeam }; 