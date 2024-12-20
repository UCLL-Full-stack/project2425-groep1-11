import { Match as MatchPrisma, Player as PlayerPrisma } from '@prisma/client';
import { Player } from './player';


export class Match {
    readonly id: number;
    readonly location: string;
    readonly date: Date;
    readonly homeTeamName: string;
    readonly awayTeamName: string;
    readonly homeScore?: number | null;
    readonly awayScore?: number | null;
    readonly players?: Player[];

    constructor(match: {id: number, location: string, date: Date, homeTeamName: string, awayTeamName: string, homeScore: number | null, awayScore: number | null, players?: Player[]}) {

        this.validate(match);

        this.id = match.id;
        this.location = match.location;
        this.date = match.date;
        this.homeTeamName = match.homeTeamName;
        this.awayTeamName = match.awayTeamName;
        this.homeScore = match.homeScore;
        this.awayScore = match.awayScore;
        this.players = match.players
    }

    getId(): number {
        return this.id;
    }

    getLocation(): string {
        return this.location;
    }

    getDate(): Date {
        return this.date;
    }

    getHomeTeamName(): string {
        return this.homeTeamName;
    }

    getAwayTeamName(): string {
        return this.awayTeamName;
    }

    getHomeScore(): number | null | undefined {
        return this.homeScore;
    }

    getAwayScore(): number | undefined | null {
        return this.awayScore;
    }

    validate(match: {id: number, location: string, date: Date, homeTeamName: string, awayTeamName: string, homeScore: number | null, awayScore: number | null, players?: Player[]}) {
        if (!match.location || match.location.trim() === '') {
            throw new Error('Location is required');
        }
        if (!match.date || match.date.toString().trim() === '') {
            throw new Error('Date is required');
        }
        if (!match.homeTeamName || match.homeTeamName.trim() === '') {
            throw new Error('Home team name is required');
        }
        if (!match.awayTeamName || match.awayTeamName.trim() === '') {
            throw new Error('Away team name is required');
        }

       // homeScore and awayScore can be null but not negative number
    //    if (match.homeScore && match.homeScore < 0) {
    //        throw new Error('Home score cannot be negative');
    //    }
    }

    static from({ id, location, date, homeTeamName, awayTeamName, homeScore, awayScore, players}: MatchPrisma & {players?: PlayerPrisma[]}): Match {
        return new Match({
            id,
            location,
            date,
            homeTeamName,
            awayTeamName,
            homeScore,
            awayScore,
            players: players ? players.map(Player.from) : undefined       
         });
    }
    
}