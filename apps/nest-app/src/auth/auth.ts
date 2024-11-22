import { AuthEntity } from "shared-lib/src/lib/entities/auth";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Auth implements AuthEntity {
    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    token?: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @DeleteDateColumn()
    deleted: Date;
}
