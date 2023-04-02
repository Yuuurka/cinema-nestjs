import {Entity, Column, PrimaryGeneratedColumn, Check, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { File } from "../file/file.entity"

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    /** Ограничение, чек **/
    @Check('"year" > 1895 AND year <= extract(year from NOW()) + 6')
    year: number;

    @Column()
    description: string;

    @ManyToMany(() => File)
    @JoinTable()
    screenshots: File[];
}
