import { GameEntity } from "shared-lib/src/lib/entities/game";
import { Developer } from "../developer/developer";
import { Rating } from "../rating/rating";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GamePlatform } from "../platform/gameplatform";

@Entity()
export class Game implements GameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    genre: string;

    @ManyToOne(() => Developer, developer => developer.games, { eager: true })
    developer: Developer;

    @Column({ type: 'date' })
    releaseDate: Date;

    @OneToMany(() => Rating, rating => rating.game, { eager: true })
    ratings: Rating[];

    @OneToMany(() => GamePlatform, gamePlatform => gamePlatform.game, { eager: true , cascade: true })
    platforms: GamePlatform[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;
}