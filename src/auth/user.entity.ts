import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./profile.entity";

@Entity()
export class User {
    @OneToOne(() => Profile, profile => profile.profile_id)
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({nullable: false})
    login: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false, default: false})
    isAdmin: boolean;
}