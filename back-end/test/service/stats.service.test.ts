import { Stats } from "../../model/stats";
import statsDb from "../../repository/stats.db";
import statsService from "../../service/stats.service";

jest.mock('../../repository/stats.db');

describe('statsService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addStatsToPlayer', () => {
        it('should add stats to a player', async () => {
            const mockStats: Stats = new Stats({ id: 1, playerId: 1 , appearances: 10, goals: 5, assists: 3 });
            (statsDb.addStatsToPlayer as jest.Mock).mockResolvedValue(mockStats);

            const result = await statsService.addStatsToPlayer(1, { appearances: 10, goals: 5, assists: 3 }, { email: 'coach@example.com', role: 'Coach' });

            expect(result).toEqual(mockStats);
            expect(statsDb.addStatsToPlayer).toHaveBeenCalledWith(1, { appearances: 10, goals: 5, assists: 3 });
        });
    });

    describe('getAllStats', () => {
        it('should return all stats when a valid email is provided', async () => {
            const mockStats: Stats[] = [
                new Stats({ id: 1, playerId: 1, appearances: 10, goals: 5, assists: 3 }),
                new Stats({ id: 2, playerId: 2, appearances: 15, goals: 8, assists: 5 }),
            ];
            (statsDb.getAllStats as jest.Mock).mockResolvedValue(mockStats);

            const result = await statsService.getAllStats({ email: 'coach@example.com' });
            expect(result).toEqual(mockStats);
            expect(statsDb.getAllStats).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if email is not provided', async () => {
            await expect(statsService.getAllStats({ email: '' })).rejects.toThrow('decode error!');
        });
    });

    describe('updateStats', () => {
        it('should update stats if the user is authorized', async () => {
            const mockUpdatedStats: Stats = new Stats({ id: 1, playerId: 1, appearances: 20, goals: 10, assists: 8 });
            (statsDb.updateStats as jest.Mock).mockResolvedValue(mockUpdatedStats);

            const result = await statsService.updateStats(1, { appearances: 20, goals: 10, assists: 8 }, { email: 'admin@example.com', role: 'Admin' });

            expect(result).toEqual(mockUpdatedStats);
            expect(statsDb.updateStats).toHaveBeenCalledWith(1, { appearances: 20, goals: 10, assists: 8 });
        });

        it('should throw an error if the user is a player', async () => {
            await expect(
                statsService.updateStats(1, { appearances: 20, goals: 10, assists: 8 }, { email: 'player@example.com', role: 'Player' })
            ).rejects.toThrow('You are not authorized to update stats');
        });

        it('should throw an error if email is not provided', async () => {
            await expect(
                statsService.updateStats(1, { appearances: 20, goals: 10, assists: 8 }, { email: '', role: 'Admin' })
            ).rejects.toThrow('decode error!');
        });
    });

    describe('removeStats', () => {
        it('should remove stats if the user is an admin', async () => {
            (statsDb.deleteStats as jest.Mock).mockResolvedValue(undefined);

            await statsService.removeStats(1, { email: 'admin@example.com', role: 'Admin' });

            expect(statsDb.deleteStats).toHaveBeenCalledWith(1);
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                statsService.removeStats(1, { email: 'coach@example.com', role: 'Coach' })
            ).rejects.toThrow('You are not authorized to update stats');
        });

        it('should throw an error if email is not provided', async () => {
            await expect(
                statsService.removeStats(1, { email: '', role: 'Admin' })
            ).rejects.toThrow('decode error!');
        });
    });
});
