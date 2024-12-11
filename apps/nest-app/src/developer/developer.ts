import { DeveloperEntity } from "shared-lib/src/lib/entities/developer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Game } from "../game/game";
import { User } from "../user/user";

@Entity()
export class Developer implements DeveloperEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Game, game => game.developer)
    games: Game[];

    @ManyToOne(() => User)
    createdBy: User;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;
}