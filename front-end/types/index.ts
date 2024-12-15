export interface Player {
    id?: number;
    name: string;
    position: string;
    number: number;
    birthdate: Date;
    stat?: Stats;
    pictureUrl?: string;
}

export interface Team {

}

export interface Coach {
    id?: number;
    name: string;
    job: Job;
}


export interface Match {
    id?: number;
    location: string;
    date: Date;
    homeTeam: string;
    awayTeam: string;
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
    COACH = 'coach',
    ASSISTANT_COACH = 'assistant coach'
}