import { DeveloperEntity } from './developer';
import { GamePlatformEntity } from './gameplatform';
import { RatingEntity } from './rating';

export class GameEntity {
  id: number;
  name: string;
  genre: string;
  developer: DeveloperEntity;
  ratings: RatingEntity[];
  platforms: GamePlatformEntity[];

  constructor(
    id: number,
    name: string,
    genre: string,
    developer: DeveloperEntity,
    platforms: GamePlatformEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.developer = developer;
    this.ratings = [];
    this.platforms = platforms;
  }
}

export enum Genres {
  Action = "Action",
    Adventure = "Adventure",
    RPG = "Role-Playing Games",
    Shooter = "Shooter",
    Strategy = "Strategy",
    Simulation = "Simulation",
    Sports = "Sports",
    Fighting = "Fighting",
    Platformer = "Platformer",
    Puzzle = "Puzzle"
}
