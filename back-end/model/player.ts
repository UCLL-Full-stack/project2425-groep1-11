import { Player as PlayerPrisma, Stats as StatsPrisma } from '@prisma/client';
import { Stats } from './stats';
import { Position } from '../types/types';

export class Player {
    readonly id: number;
    readonly name: string;
    readonly position: Position;
    readonly number: number;
    readonly birthdate: Date;
    readonly imageUrl?: string;
    readonly stat?: Stats;
    readonly teamId?: number;

    constructor(player: {
        id: number,
        name: string,
        position: Position,
        number: number,
        birthdate: Date,
        imageUrl?: string,
        stat?: Stats
    }) { 
        this.id = player.id;
        this.name = player.name;
        this.position = player.position;
        this.birthdate = player.birthdate;
        this.number = player.number;
        this.stat = player.stat;
        this.imageUrl = player.imageUrl;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getNumber(): number {
        return this.number;
    }

    getStat(): Stats | undefined {
        return this.stat;
    }

    getPosition(): Position { 
        return this.position;
    }

    getBirthdate(): Date {
        return this.birthdate;
    }

    getimageUrl(): string | undefined {
        return this.imageUrl;
    }

    equals(player: Player): boolean {
        return (
            this.id === player.id &&
            this.name === player.name &&
            this.position === player.position &&
            this.birthdate.getTime() === player.birthdate.getTime()
        );
    }

    static from({
        id,
        name,
        position,
        number,
        birthdate,
        stat
    }: PlayerPrisma & { stat?: StatsPrisma }): Player {
        return new Player({
            id,
            name,
            position: position as Position,
            number,
            birthdate,
            stat: stat ? Stats.from(stat) : undefined
        });
    }
}
