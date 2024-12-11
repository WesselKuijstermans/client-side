import { GameEntity } from "./game";
import { PlatformEntity } from "./platform";

export class GamePlatformEntity{
    game: GameEntity;
    platform: PlatformEntity;
    releaseDate: Date;
    
    constructor(game: GameEntity, platform: PlatformEntity, releaseDate: Date){
        this.game = game;
        this.platform = platform;
        this.releaseDate = releaseDate;
    }
}