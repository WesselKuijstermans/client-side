import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Game } from "../game/game";
import { User } from "../user/user";
import { RatingEntity } from "shared-lib/src/lib/entities/rating";

@Index('rating_composite_index', ['gameId', 'userId'], { unique: true })
@Entity()
export class Rating implements RatingEntity {
    @PrimaryColumn()
    gameId: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => Game, game => game.ratings)
    game: Game;

    @ManyToOne(() => User, user => user.ratings)
    user: User;

    @Column({ type: 'double precision' })
    rating: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;
}