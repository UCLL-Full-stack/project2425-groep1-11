export type PlayerInput = {
    id?: number,
    name: string,
    position: string,
    birthdate: Date,
    number: number,
    imageUrl?: string
}

export type StatsInput = { 
     id?: number;
     playerId?: number;
     appearances: number;
     goals: number;
     assists: number
}

export type CoachInput = {
     id?: number;
     name: string;
     job: Job;
     teamId?: number;
}

export type TeamInput = {
     name: string;
}

export type MatchInput = {
     match_id?: number;
     location: string;
     date: Date;
     homeTeamName: string;
     awayTeamName: string;
     homeScore?: number | null;
     awayScore?: number | null;
}    

export type Role = 'admin' | 'player' | 'coach';


export type Job = 'head coach' | 'assistant coach'

export type Position = 'goalkeeper' | 'defender' | 'midfielder' | 'forward'