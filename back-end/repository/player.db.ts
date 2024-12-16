import db from '../util/database';
import { Player } from '../model/player';
import { PlayerInput } from '../types/types';



const findAll = async (): Promise<Player[]> => {
    try {
        const playersPrisma = await db.player.findMany(
            {include: {stat: true}}
        );
        return playersPrisma.map((playerPrisma) => Player.from({
            ...playerPrisma,
            stat: playerPrisma.stat ? playerPrisma.stat : undefined
        }));
    } catch (error) {
        throw new Error('Database error. See server log for details.');

    }
    
}

const findById = async (id: number): Promise<Player | undefined> => {
    try {
        const playerPrisma = await db.player.findUnique({
            where: {id},
            include: {stat: true}
        });
        return playerPrisma ? Player.from({
            ...playerPrisma,
            stat: playerPrisma.stat ? playerPrisma.stat : undefined
        }) : undefined;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const findByNumber = async (number: number): Promise<Player | undefined> => {
    try {
        const playerPrisma = await db.player.findFirst({
            where: {number},
            include: {stat: true}
        });
        return playerPrisma ? Player.from({
            ...playerPrisma,
            stat: playerPrisma.stat ? playerPrisma.stat : undefined
        }) : undefined;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

const addPlayer = async ({name, number , position, birthdate}: PlayerInput): Promise<Player> => {
    try {
        const playerPrisma = await db.player.create({
            data: {name,number, position, birthdate}
       });
       return Player.from(playerPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}



const updatePlayer = async (id: number, {name, number, position, birthdate}: PlayerInput): Promise<Player> => {
    try {
        const playerPrisma = await db.player.update({
            where: {id},
            data: {name, number, position, birthdate}
        });
        return Player.from(playerPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}


const deletePlayer = async (id: number): Promise<void> => {
    try {
         await db.player.delete({
            where: {id}
        });
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {findAll, addPlayer, findById, findByNumber, deletePlayer, updatePlayer};


