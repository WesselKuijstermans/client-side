import { GameEntity } from './game';
import { UserEntity } from './user';

export class RatingEntity {
  game: GameEntity;
  user: UserEntity;
  rating: number;
  review: string;
  created: Date = new Date();

  constructor(
    game: GameEntity,
    user: UserEntity,
    rating: number,
    review: string
  ) {
    this.game = game;
    this.user = user;
    this.rating = rating;
    this.review = review;
  }
}
