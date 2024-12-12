import { GamePlatformEntity } from "./gameplatform";
import { PlatformType } from "./platformtype";
import { UserEntity } from "./user";

export class PlatformEntity{
    id: number;
    name: string;
    type: PlatformType;
    createdBy: UserEntity;
    releaseDate: Date;
    games: GamePlatformEntity[];
    
    constructor(id: number, name: string, type: PlatformType, createdBy: UserEntity, releaseDate: Date){
        this.id = id;
        this.name = name;
        this.type = type;
        this.createdBy = createdBy;
        this.releaseDate = releaseDate
        this.games = [];
    }
}

export class CreatePlatformDto {
    name: string;
    type: PlatformType;
    releaseDate: Date;

    constructor(name: string, type: PlatformType, releaseDate: Date){
        this.name = name;
        this.type = type;
        this.releaseDate = releaseDate;
    }
}