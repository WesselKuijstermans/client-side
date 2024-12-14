import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Game } from "../game/game";
import { Platform } from "./platform";

@Entity()
export class GamePlatform {
    @PrimaryColumn()
    gameId: number;

    @PrimaryColumn()
    platformId: number;

    @Column()
    releaseDate: Date;

    @ManyToOne(() => Game, game => game.ratings)
    game: Game;

    @ManyToOne(() => Platform, platform => platform.games, { eager: true })
    platform: Platform;
    
}