import { Job } from "../types/types";
import { Coach as CoachPrisma } from "@prisma/client";

export class Coach {
    readonly id: number;
    readonly name: string;
    readonly job: Job;
    readonly imageUrl?: string;

    constructor(coach: { id: number, name: string, job: Job, imageUrl?: string }) {
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
            job: job as Job

        });
    }

    
    
}