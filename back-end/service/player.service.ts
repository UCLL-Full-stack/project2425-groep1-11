import playerDb from "../repository/player.db"
import { Player } from "../model/player";
import { PlayerInput } from "../types/types";

const getAllPlayers = async ({email}: {email: string}): Promise<Player[]> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }
    return playerDb.findAll();
}

const getPlayerById = async (id: number, {email} : {email: string}): Promise<Player> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    const player = await playerDb.findById(id);
    if (!player) {
        throw new Error(`Player with id ${id} not found`);
    }
    return player;
}



const addPlayer = async ({name, number ,position, birthdate, imageUrl, teamId, stat}: PlayerInput, {email, role}: {email :string, role: string}): Promise<Player> => {
    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role == 'Player') {
        throw new Error('You do not have the permission to add a player');
    }

    if (await playerDb.findById(number)) {
        throw new Error(`Player with number ${number} already exists`);
    }

    return playerDb.addPlayer({name, number, position, birthdate, imageUrl, teamId, stat});
}

const updatePlayer = async (id: number, {name, number, position, birthdate}: PlayerInput, {email, role}: {email :string, role: string} ): Promise<Player> => {

     if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role == 'Player') {
        throw new Error('You do not have the permission to add a player');
    }

   
    return playerDb.updatePlayer(id, {name, number, position, birthdate,});
}

const RemovePlayer = async (id: number, {email, role}: {email :string, role: string}): Promise<void> => {

    if (!email) {
        throw new Error('Cooked token not found');
    }

    if (role !== 'Admin') {
        throw new Error('You do not have the permission to delete a player.');
    }
   playerDb.deletePlayer(id);
}

export default {getAllPlayers, addPlayer, getPlayerById, RemovePlayer, updatePlayer};