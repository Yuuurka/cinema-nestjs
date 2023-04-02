import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { Film } from "../film/film.entity"
import {TextBlock} from "../text-block/text-block.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => TextBlock)
    /** nullable - может хранить null или нет **/
    @Column({nullable: true})
    url: string;

    @Column()
    createdAt: string;

    @Column({nullable: true})
    essenceTable: string;

    @Column({nullable: true})
    essenceId: number;
}
