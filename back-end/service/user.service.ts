import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, LogInput, UserInput } from "../types/types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";


const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const createUser = async ({email, password, role}: UserInput): Promise<User> => { 
    const existingUser = await userDb.findUserByEmail(email);

    if (existingUser) {
        throw new Error(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({email, password: hashedPassword, role});

    return await userDb.createUser(user);
   
}

const authenticate = async ({ email, password }: LogInput): Promise<AuthenticationResponse> => {
    const user = await userDb.findUserByEmail( email );

    if (!user) {
        throw new Error('User not found.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }

    return {
        token: generateJwtToken({ email, role: user.role }),
        email: email,
        role: user.role
    };
};

    



export default {
    getAllUsers, createUser, authenticate
}