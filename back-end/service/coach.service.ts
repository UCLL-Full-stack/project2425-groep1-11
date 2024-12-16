import coachDb from "../repository/coach.db";
import { CoachInput } from "../types/types";

const getAllcoaches = async () => {
    return coachDb.findAll();
}

const addCoach = async ({name, job}: CoachInput) => {
    return coachDb.addCoach({name, job});
}


export default { getAllcoaches, addCoach };