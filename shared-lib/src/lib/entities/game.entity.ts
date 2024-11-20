import { DeveloperEntity } from "./developer.entity";

export class GameEntity{
    id: number;
    name: string;
    genre: string;
    developer: DeveloperEntity;
    releaseDate: Date;
    rating: number;
    ratingCount: number;

    constructor(id: number, name: string, genre: string, developer: DeveloperEntity, releaseDate: Date, rating: number, ratingCount: number){
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.developer = developer;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.ratingCount = ratingCount;
    }

    rateGame(rating: number){ // calculate new rating and round to 1 decimal place.
        if (rating <= 1 || rating >= 10) {
            throw new Error('Rating must be between 1 and 10');
        }
        this.rating = parseFloat(((this.rating * this.ratingCount + rating) / (this.ratingCount + 1)).toFixed(1));
        this.ratingCount++;
    }
}