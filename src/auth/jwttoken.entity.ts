import {Column, Entity, OneToOne} from "typeorm";
import {User} from "./user.entity";


@Entity()
export class jwttoken{
    @OneToOne(() => User, user => user.user_id)
    @Column({nullable: false})
    user_id: number;

    @Column({nullable: false})
    token: string;
}