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

    constructor(player: {
        id: number,
        name: string,
        position: Position,
        number: number,
        birthdate: Date,
        imageUrl?: string,
        stat?: Stats
    }) { 

        this.validate(player);

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

    validate( player:{name: string, position: string, number: number, birthdate: Date, imageUrl?: string}) {
        if (player.name.trim() === '') {
            throw new Error('Name is required');
        }
        if (player.position !== 'Goalkeeper' && player.position !== 'Defender' && player.position !== 'Midfielder' && player.position !== 'Forward') {
            throw new Error('Position can only be Goalkeeper, Defender, Midfielder or Forward');
        }
        if (!player.number || isNaN(player.number) ) {
            throw new Error('Number is required');
        }
        if (player.number < 0 || player.number > 99) {
            throw new Error('Number must be between 0 and 99');
        }
        // birthdate validation must be in the past
        if (player.birthdate.getTime() > new Date().getTime()) {
            throw new Error('Birthdate must be in the past');
        }
    }

    static from({
        id,
        name,
        position,
        number,
        birthdate,
        imageUrl,
        stat
    }: PlayerPrisma & { stat?: StatsPrisma }): Player {
        return new Player({
            id,
            name,
            position: position as Position,
            number,
            birthdate,
            imageUrl: imageUrl ? imageUrl : undefined,
            stat: stat ? Stats.from(stat) : undefined
        });
    }
}
