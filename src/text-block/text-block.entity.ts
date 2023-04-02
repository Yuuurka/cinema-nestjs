import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import {File} from "../file/file.entity";

/**Описание моделей/сущностей, более подробно typeorm docs: https://orkhan.gitbook.io/typeorm/docs/entities **/
@Entity()
export class TextBlock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    uniqueName: string;

    @Column()
    name: string;

    /** Описание связей, должны быть взаимными: ManyToMany/ManyToMany, OneToMany/ManyToOne **/
    @ManyToMany(() => File)
    @JoinTable()
    image: File[];

    @Column()
    text: string;

    @Column()
    group: string;
}