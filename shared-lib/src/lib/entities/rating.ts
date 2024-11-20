import { GameEntity } from "./game";
import { UserEntity } from "./user";

export class RatingEntity {
    game: GameEntity;
    user: UserEntity;
    rating: number;

    constructor(game: GameEntity, user: UserEntity, rating: number) {
        this.game = game;
        this.user = user;
        this.rating = rating;
    }
}