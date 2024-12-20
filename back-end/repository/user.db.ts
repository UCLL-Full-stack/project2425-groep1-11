import { User } from '../model/user';
import db from '../util/database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await db.user.findMany()
        return usersPrisma.map((userPrisma) => User.from(userPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await db.user.create({
            data: user,
        })
        return User.from(userPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const findUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
        const userPrisma = await db.user.findUnique({
            where: {email}
        })
        return userPrisma ? User.from(userPrisma) : undefined;
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}



export default {
    getAllUsers, createUser, findUserByEmail
}