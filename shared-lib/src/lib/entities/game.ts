import { DeveloperEntity } from "./developer";
import { RatingEntity } from "./rating";

export class GameEntity{
    id: number;
    name: string;
    genre: string;
    developer: DeveloperEntity;
    releaseDate: Date;
    ratings: RatingEntity[];

    constructor(id: number, name: string, genre: string, developer: DeveloperEntity, releaseDate: Date){
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.developer = developer;
        this.releaseDate = releaseDate;
        this.ratings = [];
    }
}