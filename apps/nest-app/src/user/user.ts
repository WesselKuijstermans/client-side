import { UserEntity } from "shared-lib/src/lib/entities/user";
import { Rating } from "../rating/rating";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;
    
    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[];
}