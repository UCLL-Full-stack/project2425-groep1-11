import { Coach } from "../../model/coach";
import coachDb from "../../repository/coach.db";
import coachService from "../../service/coach.service";


jest.mock('../../repository/coach.db');

describe('coachService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllcoaches', () => {
        it('should return all coaches', async () => {
            const mockCoaches: Coach[] = [
              new Coach({ id: 1, name: 'Coach A', job: 'Head coach', imageUrl: 'image1.jpg'}),
                new Coach({ id: 2, name: 'Coach B', job: 'Assistant coach', imageUrl: 'image2.jpg'}),
            ];
            (coachDb.findAll as jest.Mock).mockResolvedValue(mockCoaches);

            const result = await coachService.getAllcoaches();

            expect(result).toEqual(mockCoaches);
            expect(coachDb.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('addCoach', () => {
        it('should add a new coach if the user is an admin', async () => {
            const mockCoach: Coach = new Coach({ id: 1, name: 'Coach A', job: 'Head coach', imageUrl: 'image1.jpg'});
            (coachDb.addCoach as jest.Mock).mockResolvedValue(mockCoach);

            const result = await coachService.addCoach(
                { name: 'Coach A', job: 'Head coach', imageUrl: 'image1.jpg' },
                { email: 'admin@example.com', role: 'Admin' }
            );

            expect(result).toEqual(mockCoach);
            expect(coachDb.addCoach).toHaveBeenCalledWith({ name: 'Coach A', job: 'Head coach', imageUrl: 'image1.jpg', teamId: 1 });
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                coachService.addCoach(
                    { name: 'Coach A', job: 'Head coach', imageUrl: 'image1.jpg' },
                    { email: 'user@example.com', role: 'User' }
                )
            ).rejects.toThrow('Only admin has the permission to add a coach');
        });
    });

    describe('updateCoach', () => {
        it('should update a coach if the user is an admin', async () => {
            const mockCoach: Coach = new Coach({ id: 1, name: 'Updated Coach', job: 'Head coach', imageUrl: 'updatedImage.jpg'});
            (coachDb.updateCoach as jest.Mock).mockResolvedValue(mockCoach);

            const result = await coachService.updateCoach(
                1,
                { name: 'Updated Coach', job: 'Assistant coach', imageUrl: 'updatedImage.jpg' },
                { email: 'admin@example.com', role: 'Admin' }
            );

            expect(result).toEqual(mockCoach);
            expect(coachDb.updateCoach).toHaveBeenCalledWith(1, { name: 'Updated Coach', job: 'Assistant coach', imageUrl: 'updatedImage.jpg' });
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                coachService.updateCoach(
                    1,
                    { name: 'Updated Coach', job: 'Assistant coach', imageUrl: 'updatedImage.jpg' },
                    { email: 'user@example.com', role: 'User' }
                )
            ).rejects.toThrow('Only admin has the permission to update a coach');
        });
    });

    describe('removeCoach', () => {
        it('should remove a coach if the user is an admin', async () => {
            (coachDb.removeCoach as jest.Mock).mockResolvedValue(undefined);

            await coachService.removeCoach(1, { email: 'admin@example.com', role: 'Admin' });

            expect(coachDb.removeCoach).toHaveBeenCalledWith(1);
        });

        it('should throw an error if the user is not an admin', async () => {
            await expect(
                coachService.removeCoach(1, { email: 'user@example.com', role: 'User' })
            ).rejects.toThrow('Only admin has the permission to remove a coach');
        });
    });
});
