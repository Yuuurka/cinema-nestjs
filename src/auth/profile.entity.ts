import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Profile{
    @OneToOne(() => User, user => user.user_id)
    profile_id: number;

    @Column()
    name: string;

    @Column()
    fam: string;

    @Column()
    phone_number: string;
}