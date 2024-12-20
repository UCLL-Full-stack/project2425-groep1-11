import { Match } from "../../model/match";
import matchDb from "../../repository/match.db";
import matchService from "../../service/match.service";

jest.mock('../../repository/match.db');

describe('matchService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMatches', () => {
        it('should return all matches if the email is provided', async () => {
            const mockMatches: Match[] = [
               new Match({ id: 1, location: 'Stadium A', date: new Date('2024-12-20'), homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 }),
                new Match({ id: 2, location: 'Stadium B', date: new Date('2024-12-21'), homeTeamName: 'Team X', awayTeamName: 'Team Y', homeScore: 2, awayScore: 2 }),
            ];
            (matchDb.findAll as jest.Mock).mockResolvedValue(mockMatches);

            const result = await matchService.getAllMatches({ email: 'user@example.com' });

            expect(result).toEqual(mockMatches);
            expect(matchDb.findAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if email is not provided', async () => {
            await expect(matchService.getAllMatches({ email: '' })).rejects.toThrow('Cooked token not found');
        });
    });

    describe('addMatch', () => {
        it('should add a match if the user is an admin', async () => {
            const mockMatch: Match = new Match({ id: 1, location: 'Stadium A', date: new Date('2024-12-20'), homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 });
            (matchDb.addMatch as jest.Mock).mockResolvedValue(mockMatch);

            const result = await matchService.addMatch(
                { location: 'Stadium A', date: new Date('2024-12-20'), homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 },
                { email: 'admin@example.com', role: 'Admin' }
            );

            expect(result).toEqual(mockMatch);
            expect(matchDb.addMatch).toHaveBeenCalledWith({ location: 'Stadium A', date: new Date('2024-12-20'), homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 });
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                matchService.addMatch(
                    { location: 'Stadium A', date: new Date('2024-12-20'), homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 },
                    { email: 'user@example.com', role: 'User' }
                )
            ).rejects.toThrow('Only admin has the permission to add a match');
        });
    });

    describe('updateMatch', () => {
        it('should update a match if the user is an admin', async () => {
            const mockMatch: Match = new Match({ id: 1, location: 'Updated Stadium', date: new Date('2024-12-20'), homeTeamName: 'Team X', awayTeamName: 'Team Y', homeScore: 2, awayScore: 2 });
            (matchDb.updateMatch as jest.Mock).mockResolvedValue(mockMatch);

            const result = await matchService.updateMatch(
                1,
                { location: 'Updated Stadium', date: new Date('2024-12-21'), homeTeamName: 'Team X', awayTeamName: 'Team Y', homeScore: 2, awayScore: 2 },
                { email: 'admin@example.com', role: 'Admin' }
            );

            expect(result).toEqual(mockMatch);
            expect(matchDb.updateMatch).toHaveBeenCalledWith(1, { location: 'Updated Stadium', date: new Date('2024-12-21'), homeTeamName: 'Team X', awayTeamName: 'Team Y', homeScore: 2, awayScore: 2 });
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                matchService.updateMatch(
                    1,
                    { location: 'Updated Stadium', date: new Date('2024-12-21'), homeTeamName: 'Team X', awayTeamName: 'Team Y', homeScore: 2, awayScore: 2 },
                    { email: 'user@example.com', role: 'User' }
                )
            ).rejects.toThrow('Only admin has the permission to update a match');
        });
    });

    describe('deleteMatch', () => {
        it('should delete a match if the user is an admin', async () => {
            (matchDb.deleteMatch as jest.Mock).mockResolvedValue(undefined);

            await matchService.deleteMatch(1, { email: 'admin@example.com', role: 'Admin' });

            expect(matchDb.deleteMatch).toHaveBeenCalledWith(1);
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                matchService.deleteMatch(1, { email: 'user@example.com', role: 'User' })
            ).rejects.toThrow('Only admin has the permission to delete a match');
        });
    });

    describe('addPlayerToMatch', () => {
        it('should add players to a match if the user is not a player', async () => {
            const mockAddedPlayers = [
                { id: 1, location: 'Stadium A', date: '2024-12-20', homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 },
                { id: 2, location: 'Stadium A', date: '2024-12-20', homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 }
            ];

            (matchDb.addPlayerToMatch as jest.Mock).mockResolvedValueOnce(mockAddedPlayers[0]).mockResolvedValueOnce(mockAddedPlayers[1]);

            const result = await matchService.addPlayerToMatch(1, [10, 20], { email: 'admin@example.com', role: 'Admin' });

            expect(result).toEqual(mockAddedPlayers);
            expect(matchDb.addPlayerToMatch).toHaveBeenCalledTimes(2);
            expect(matchDb.addPlayerToMatch).toHaveBeenCalledWith(1, 10);
            expect(matchDb.addPlayerToMatch).toHaveBeenCalledWith(1, 20);
        });

        it('should throw an error if the user is a player', async () => {
            await expect(
                matchService.addPlayerToMatch(1, [10, 20], { email: 'player@example.com', role: 'Player' })
            ).rejects.toThrow('Only admin has the permission to add a player to a match');
        });
    });

    describe('getMatchById', () => {
        it('should return a match by its ID', async () => {
            const mockMatch: Match = new Match({ id: 1, location: 'Stadium A', date: new Date('2024-12-20'), homeTeamName: 'Team A', awayTeamName: 'Team B', homeScore: 3, awayScore: 1 });
            (matchDb.getMatchById as jest.Mock).mockResolvedValue(mockMatch);

            const result = await matchService.getMatchById(1);

            expect(result).toEqual(mockMatch);
            expect(matchDb.getMatchById).toHaveBeenCalledWith(1);
        });
    });
});
