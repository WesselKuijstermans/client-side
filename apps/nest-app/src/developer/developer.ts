import { DeveloperEntity } from "shared-lib/src/lib/entities/developer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;
}