import { GameEntity } from "./game";
import { UserEntity } from "./user";

export class DeveloperEntity {
  id: number;
  name: string;
  email: string;
  createdBy: UserEntity
  games: GameEntity[];

  constructor(id: number, name: string, email: string, createdBy: UserEntity, games: GameEntity[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdBy = createdBy;
    this.games = games;
  }
}
