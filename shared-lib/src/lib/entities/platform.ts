import { GamePlatformEntity } from "./gameplatform";
import { PlatformType } from "./platformtype";

export class PlatformEntity{
    id: number;
    name: string;
    type: PlatformType;
    games: GamePlatformEntity[];
    
    constructor(id: number, name: string, type: PlatformType){
        this.id = id;
        this.name = name;
        this.type = type;
        this.games = [];
    }
}