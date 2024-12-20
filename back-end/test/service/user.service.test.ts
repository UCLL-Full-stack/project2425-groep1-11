
import bcrypt from 'bcrypt';
import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import { generateJwtToken } from '../../util/jwt';
import { id } from 'date-fns/locale';


jest.mock('../../repository/user.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

describe('userService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const mockUsers: User[] = [
             new User({ id: 1, email: 'email@mail.com', password: 'password', role: 'Player' }),
                new User({ id: 2, email: 'email1@mail.com', password: 'password1', role: 'Player' }),
            ];
            (userDb.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

            const result = await userService.getAllUsers();
            expect(result).toEqual(mockUsers);
            expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
        });
    });

    describe('createUser', () => {
        it('should create a new user when email does not already exist', async () => {
            (userDb.findUserByEmail as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            (userDb.createUser as jest.Mock).mockResolvedValue({
                id: 1,
                email: 'newuser@example.com',
                password: 'hashedPassword',
                role: 'Coach',
            });

            const result = await userService.createUser({
                email: 'newuser@example.com',
                password: 'password123',
                role: 'Coach',
            });

            expect(result).toEqual({
                id: 1,
                email: 'newuser@example.com',
                password: 'hashedPassword',
                role: 'Coach',
            });
            expect(userDb.findUserByEmail).toHaveBeenCalledWith('newuser@example.com');
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
            expect(userDb.createUser).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: undefined,
                    email: 'newuser@example.com',
                    password: 'hashedPassword',
                    role: 'Coach',
                })
            );
        });

        it('should throw an error if the email already exists', async () => {
            (userDb.findUserByEmail as jest.Mock).mockResolvedValue({
                id: 1,
                email: 'existinguser@example.com',
                password: 'hashedPassword',
                role: 'User',
            });

            await expect(
                userService.createUser({
                    email: 'existinguser@example.com',
                    password: 'password123',
                    role: 'Player',
                })
            ).rejects.toThrow('User with email existinguser@example.com already exists');
        });
    });

    describe('authenticate', () => {
        it('should authenticate a user with valid email and password', async () => {
            (userDb.findUserByEmail as jest.Mock).mockResolvedValue({
                id: 1,
                email: 'validuser@example.com',
                password: 'hashedPassword',
                role: 'User',
            });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (generateJwtToken as jest.Mock).mockReturnValue('mockToken');

            const result = await userService.authenticate({
                email: 'validuser@example.com',
                password: 'password123',
            });

            expect(result).toEqual({
                token: 'mockToken',
                email: 'validuser@example.com',
                role: 'User',
            });
            expect(userDb.findUserByEmail).toHaveBeenCalledWith('validuser@example.com');
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(generateJwtToken).toHaveBeenCalledWith({
                email: 'validuser@example.com',
                role: 'User',
            });
        });

        it('should throw an error if the user is not found', async () => {
            (userDb.findUserByEmail as jest.Mock).mockResolvedValue(null);

            await expect(
                userService.authenticate({
                    email: 'nonexistent@example.com',
                    password: 'password123',
                })
            ).rejects.toThrow('User not found.');
        });

        it('should throw an error if the password is incorrect', async () => {
            (userDb.findUserByEmail as jest.Mock).mockResolvedValue({
                id: 1,
                email: 'user@example.com',
                password: 'hashedPassword',
                role: 'User',
            });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(
                userService.authenticate({
                    email: 'user@example.com',
                    password: 'wrongPassword',
                })
            ).rejects.toThrow('Incorrect password.');
        });
    });
});
