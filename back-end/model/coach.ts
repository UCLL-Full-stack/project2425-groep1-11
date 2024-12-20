import { Job } from "../types/types";
import { Coach as CoachPrisma } from "@prisma/client";

export class Coach {
    readonly id: number;
    readonly name: string;
    readonly job: Job;
    readonly imageUrl?: string;
    readonly teamId: number = 1;

    constructor(coach: { id: number, name: string, job: Job, imageUrl?: string }) {

        this.validate(coach);
        this.id = coach.id;
        this.name = coach.name;
        this.job = coach.job;
        this.imageUrl = coach.imageUrl
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getJob(): Job {
        return this.job;
    }

    getImageUrl(): string | undefined {
        return this.imageUrl;
    }

    static from({ id, name, job, imageUrl }: CoachPrisma ): Coach {
        return new Coach({
            id,
            name,
            job: job as Job,
            imageUrl: imageUrl || undefined

        });
    }

    validate(coach: { id: number, name: string, job: Job, imageUrl?: string }) {
        if (coach.name.trim() === '' || !coach.name ) {
            throw new Error('Name cannot be empty.');
        }

        if (coach.job.trim() === '' || !coach.job ) {
            throw new Error('Job cannot be empty.');
        }       

        if (coach.job !== 'Head coach' && coach.job !== 'Assistant coach') {
            throw new Error('Job must be Head coach or Assistant coach.');
        }
    }
    
    
}