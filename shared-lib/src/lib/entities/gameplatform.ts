import { GameEntity } from "./game";
import { PlatformEntity } from "./platform";

export class GamePlatformEntity{
    gameId: number;
    game: GameEntity | null;
    platformId: number;
    platform: PlatformEntity | null;
    releaseDate: Date;
    
    constructor(gameId: number, game: GameEntity, platformId: number, platform: PlatformEntity, releaseDate: Date){
        this.gameId = gameId;
        this.game = game;
        this.platformId = platformId
        this.platform = platform;
        this.releaseDate = releaseDate;
    }
}