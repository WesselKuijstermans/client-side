import { UserEntity } from "shared-lib/src/lib/entities/user";
import { Rating } from "../rating/rating";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User implements UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, update: false })
    email: string;
    
    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;
}