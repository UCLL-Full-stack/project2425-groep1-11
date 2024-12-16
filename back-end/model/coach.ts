import { Job } from "../types/types";
import { Coach as CoachPrisma } from "@prisma/client";

export class Coach {
    readonly id: number;
    readonly name: string;
    readonly job: Job;
    readonly teamId?: number;

    constructor(coach: { id: number, name: string, job: Job, teamId?: number }) {
        this.id = coach.id;
        this.name = coach.name;
        this.job = coach.job;
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

    static from({ id, name, job }: CoachPrisma ): Coach {
        return new Coach({
            id,
            name,
            job: job as Job
        });
    }

    
    
}