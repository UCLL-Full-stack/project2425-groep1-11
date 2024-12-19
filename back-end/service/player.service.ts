import playerDb from "../repository/player.db"
import { Player } from "../model/player";
import { PlayerInput } from "../types/types";

const getAllPlayers = async (): Promise<Player[]> => {
    // if (!email) {
    //     throw new Error('Cooked token not found');
    // }

    return playerDb.findAll();
}

const getPlayerById = async (id: number): Promise<Player> => {
    const player = await playerDb.findById(id);
    if (!player) {
        throw new Error(`Player with id ${id} not found`);
    }
    return player;
}

const findPlayerByNumber = async (number: number): Promise<Player | undefined> => {
    return playerDb.findByNumber(number);
}

const addPlayer = async ({name, number ,position, birthdate, imageUrl, teamId, stat}: PlayerInput): Promise<Player> => {
    if (await findPlayerByNumber(number)) {
        throw new Error(`Player with number ${number} already exists`);
    }

    return playerDb.addPlayer({name, number, position, birthdate, imageUrl, teamId, stat});
}

const updatePlayer = async (id: number, {name, number, position, birthdate}: PlayerInput): Promise<Player> => {
    if (await playerDb.findByNumber(number)) {
        throw new Error(`Player with number ${number} already exists`);
    }

    return playerDb.updatePlayer(id, {name, number, position, birthdate,});
}

const RemovePlayer = async (id: number): Promise<void> => {
   playerDb.deletePlayer(id);
}

export default {getAllPlayers, addPlayer, getPlayerById, RemovePlayer, updatePlayer};