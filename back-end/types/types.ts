export type PlayerInput = {
    id?: number,
    name: string,
    position: string,
    birthdate: Date,
    number: number,
    imageUrl?: string,
    stat?: StatsInput,
    teamId?: number
}

export type StatsInput = { 
     id?: number;
     // playerId?: number;
     appearances: number;
     goals: number;
     assists: number
}

export type CoachInput = {
     id?: number;
     name: string;
     job: Job;
     imageUrl?: string;
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

export type UserInput = {
     id?: number;
     email: string;
     password: string;
     role: Role;
}

export type LogInput = {
     email: string;
     password: string;
}

export type JWTload = {
     email: string;
     role: Role;
}


export type AuthenticationResponse = {
     token: string;
     email: string;
     role: string;
 }


export type Role = 'Admin' | 'Player' | 'Coach';


export type Job = 'Head coach' | 'Assistant coach'

export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'