export interface Player {
    id?: number;
    name: string;
    position: string;
    number: number;
    birthdate: Date;
    stat?: Stats;
    imageUrl?: string;
}

export interface Team {
    id?: number;
    name: string;
    players?: Player[];
    coach?: Coach;
    points?: number;
    goalsFor?: number;
    goalsAg?: number;
    homeMatches?: Match[];
    awayMatches?: Match[];

}

export interface Coach {
    id?: number;
    name: string;
    job: Job;
    imageUrl?: string;
}


export interface Match {
    id?: number;
    location: string;
    date: Date;
    homeTeamName: string;
    awayTeamName: string;
    homeScore: number;
    awayScore: number;
}

export interface Stats {
    id?: number;
    playerId: number;
    appearances: number;
    goals: number;
    assists: number;
}

export enum Job {
    COACH = 'Head Coach',
    ASSISTANT_COACH = 'Assistant Coach',
    GOALKEEPER_COACH = 'Goalkeeper Coach',
    FITNESS_COACH = 'Fitness Coach'
}

export interface User {
    id?: number;
    email: string;
    password: string;
    role: Role;
}

export type UserInlogInput = {
    email: string;
    password: string;
}


export enum Role {
    ADMIN = 'Admin',
    PLAYER = 'Player',
    COACH = 'Coach'
}