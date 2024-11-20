import { DeveloperEntity } from "shared-lib/src/lib/entities/developer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../game/game";

@Entity()
export class Developer implements DeveloperEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Game, game => game.developer)
    games: Game[];
}