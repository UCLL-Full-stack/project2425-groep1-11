import { Role } from "../types/types";
import { User as UserPrisma } from "@prisma/client";


export class User {


    readonly id: number;
    readonly email: string;
    readonly password: string;
    readonly role: Role;

    constructor(user: {id: number, email: string, password: string, role: Role}) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    getId(): number {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    static from({ id, email, password, role }: UserPrisma): User {
        return new User({
            id,
            email,
            password,
            role: role as Role
        })
    }
}