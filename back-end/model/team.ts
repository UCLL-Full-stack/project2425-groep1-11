import { Coach } from "./coach";
import { Match } from "./match";
import { Player } from "./player";
import { Team as TeamPrisma, Player as PlayerPrisma, Coach as CoachPrisma, Match as MatchPrisma } from "@prisma/client";

export class Team {
    readonly id: number;
    readonly name: string;
    readonly goalsFor: number;
    readonly goalsAg: number;
    readonly points: number;
    readonly players?: Player[];
    readonly coaches?: Coach[];  
    readonly homeMatches?: Match[];
    readonly awayMatches?: Match[];

    constructor(team: { 
        id: number, 
        name: string, 
        goalsFor: number, 
        goalsAg: number, 
        points: number, 
        players?: Player[], 
        coaches?: Coach[], 
        homeMatches?: Match[], 
        awayMatches?: Match[] 
    }) {
        this.id = team.id;
        this.name = team.name;
        this.players = team.players;
        this.coaches = team.coaches;
        this.homeMatches = team.homeMatches;
        this.awayMatches = team.awayMatches;

        // Calculate points and goals
        const { points, goalsFor, goalsAg } = this.calculatePoints();
        this.points = points;
        this.goalsFor = goalsFor;
        this.goalsAg = goalsAg;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getGoalsFor(): number {
        return this.goalsFor;
    }

    getGoalsAg(): number {
        return this.goalsAg;
    }

    getPlayers(): Player[] | undefined {
        return this.players;
    }

    getCoaches(): Coach[] | undefined {
        return this.coaches;
    }

    getHomeMatches(): Match[] | undefined {
        return this.homeMatches;
    }

    getAwayMatches(): Match[] | undefined {
        return this.awayMatches;
    }

    /**
     * Calculates team statistics (points, goals for, and goals against) from home and away matches.
     */
    calculatePoints(): { points: number; goalsFor: number; goalsAg: number } {
        let points = 0;
        let goalsFor = 0;
        let goalsAg = 0;
    
        // Process home matches
        if (this.homeMatches) {
            this.homeMatches.forEach((match) => {
                // Skip matches with no scores (not played)
                if (match.homeScore == null || match.awayScore == null) return;
    
                goalsFor += match.homeScore;
                goalsAg += match.awayScore;
    
                if (match.homeScore > match.awayScore) {
                    points += 3; // Win
                } else if (match.homeScore === match.awayScore) {
                    points += 1; // Draw
                }
                // Loss gives no points, do nothing
            });
        }
    
        // Process away matches
        if (this.awayMatches) {
            this.awayMatches.forEach((match) => {
                // Skip matches with no scores (not played)
                if (match.homeScore == null || match.awayScore == null) return;
    
                goalsFor += match.awayScore;
                goalsAg += match.homeScore;
    
                if (match.awayScore > match.homeScore) {
                    points += 3; // Win
                } else if (match.awayScore === match.homeScore) {
                    points += 1; // Draw
                }
                // Loss gives no points, do nothing
            });
        }
    
        return { points, goalsFor, goalsAg };
    }
    
   static from({ id, name, goalsFor, goalsAg, points, players, coaches, homeMatches, awayMatches }: TeamPrisma & {players?: PlayerPrisma[], coaches?: CoachPrisma[], homeMatches?: MatchPrisma[], awayMatches?: MatchPrisma[]}): Team {
        return new Team({
            id,
            name,
            goalsFor,
            goalsAg,
            points,
            players: players ? players.map(Player.from) : undefined,
            coaches: coaches ? coaches.map(Coach.from) : undefined,
            homeMatches: homeMatches ? homeMatches.map(Match.from) : undefined,
            awayMatches: awayMatches ? awayMatches.map(Match.from) : undefined,
        });
    }
}
