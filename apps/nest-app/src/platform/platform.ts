import { PlatformEntity } from "shared-lib/src/lib/entities/platform";
import { PlatformType } from "shared-lib/src/lib/entities/platformtype";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GamePlatform } from "./gameplatform";
import { User } from "../user/user";

@Entity()
export class Platform implements PlatformEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: PlatformType })
    type: PlatformType;

    @OneToMany(() => GamePlatform, gamePlatform => gamePlatform.platform)
    games: GamePlatform[];

    @Column({ nullable: true }) 
    releaseDate: Date;

    @ManyToOne(() => User, { eager: true })
    createdBy: User;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;
}

