import { RatingEntity } from "./rating";

export class UserEntity {
    id: number;

    name: string;

    email: string;

    ratings: RatingEntity[];

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.ratings = [];
    }
}