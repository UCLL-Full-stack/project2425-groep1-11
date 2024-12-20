import { Coach } from "../model/coach";
import coachDb from "../repository/coach.db";
import { CoachInput } from "../types/types";

const getAllcoaches = async () => {
    return coachDb.findAll();
}

const addCoach = async ({name, job, imageUrl}: CoachInput, {email, role}: {email:string, role: string} ) => {
    

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to add a coach');
    }

    return coachDb.addCoach({name, job, imageUrl ,teamId: 1});
}

const updateCoach = async (id: number, {name, job, imageUrl}: CoachInput, {email, role}: {email:string, role: string} ) => {

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to update a coach');
    }
    return coachDb.updateCoach(id, {name, job, imageUrl});
}


const removeCoach = async (id: number, {email, role}: {email:string, role: string} ) => {

    if (role !== 'Admin') {
        throw new Error('Only admin has the permission to remove a coach');
    }
    return coachDb.removeCoach(id);
}

export default { getAllcoaches, addCoach, updateCoach, removeCoach };