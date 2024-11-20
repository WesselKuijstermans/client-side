import { GameEntity } from "shared-lib/src/lib/entities/game";
import { Developer } from "../developer/developer";
import { Rating } from "../rating/rating";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game implements GameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    genre: string;

    @ManyToOne(() => Developer, developer => developer.games)
    developer: Developer;

    @Column({ type: 'date' })
    releaseDate: Date;

    @OneToMany(() => Rating, rating => rating.game)
    ratings: Rating[];
}