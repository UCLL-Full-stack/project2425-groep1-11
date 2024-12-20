import { Team } from "../../model/team";
import teamDb from "../../repository/team.db";
import teamService from "../../service/team.service";



jest.mock('../../repository/team.db');

describe('teamService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTeams', () => {
        it('should return all teams when a valid email is provided', async () => {
            const mockTeams: Team[] = [
               new Team({ id: 1, name: 'Team A', goalsFor: 0, goalsAg: 0, points: 0 }),
                new Team({ id: 2, name: 'Team B', goalsFor: 0, goalsAg: 0, points: 0 }),
            ];
            (teamDb.findAll as jest.Mock).mockResolvedValue(mockTeams);

            const result = await teamService.getAllTeams({ email: 'user@example.com' });
            expect(result).toEqual(mockTeams);
            expect(teamDb.findAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if email is not provided', async () => {
            await expect(teamService.getAllTeams({ email: '' })).rejects.toThrow('Cooked token not found');
        });
    });

    describe('addTeam', () => {
        it('should add a team if the user is an admin', async () => {
            const mockTeam: Team = new Team({ id: 1, name: 'Team A', goalsFor: 0, goalsAg: 0, points: 0 });
            (teamDb.addTeam as jest.Mock).mockResolvedValue(mockTeam);

            const result = await teamService.addTeam(
                { name: 'Team A' },
                { email: 'admin@example.com', role: 'Admin' }
            );

            expect(result).toEqual(mockTeam);
            expect(teamDb.addTeam).toHaveBeenCalledWith({ name: 'Team A' });
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                teamService.addTeam(
                    { name: 'Team A' },
                    { email: 'user@example.com', role: 'User' }
                )
            ).rejects.toThrow('Only admin has the permission to add a team');
        });

        it('should throw an error if email is not provided', async () => {
            await expect(
                teamService.addTeam(
                    { name: 'Team A' },
                    { email: '', role: 'Admin' }
                )
            ).rejects.toThrow('Cooked token not found');
        });
    });

    describe('updateTeam', () => {
        it('should update a team if the user is an admin', async () => {
            const mockUpdatedTeam: Team = new Team({ id: 1, name: 'Updated Team A', goalsFor: 0, goalsAg: 0, points: 0 });
            (teamDb.updateTeam as jest.Mock).mockResolvedValue(mockUpdatedTeam);

            const result = await teamService.updateTeam(
                1,
                { name: 'Updated Team A' },
                { email: 'admin@example.com', role: 'Admin' }
            );

            expect(result).toEqual(mockUpdatedTeam);
            expect(teamDb.updateTeam).toHaveBeenCalledWith(1, { name: 'Updated Team A' });
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                teamService.updateTeam(
                    1,
                    { name: 'Updated Team A' },
                    { email: 'user@example.com', role: 'User' }
                )
            ).rejects.toThrow('Only admin has the permission to add a team');
        });

        it('should throw an error if email is not provided', async () => {
            await expect(
                teamService.updateTeam(
                    1,
                    { name: 'Updated Team A' },
                    { email: '', role: 'Admin' }
                )
            ).rejects.toThrow('Cooked token not found');
        });
    });

    describe('deleteTeam', () => {
        it('should delete a team if the user is an admin', async () => {
            (teamDb.deleteTeam as jest.Mock).mockResolvedValue(true);

            const result = await teamService.deleteTeam(1, {
                email: 'admin@example.com',
                role: 'Admin',
            });

            expect(result).toBe(true);
            expect(teamDb.deleteTeam).toHaveBeenCalledWith(1);
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                teamService.deleteTeam(1, {
                    email: 'user@example.com',
                    role: 'User',
                })
            ).rejects.toThrow('Only admin has the permission to add a team');
        });

        it('should throw an error if email is not provided', async () => {
            await expect(
                teamService.deleteTeam(1, {
                    email: '',
                    role: 'Admin',
                })
            ).rejects.toThrow('Cooked token not found');
        });
    });
});
