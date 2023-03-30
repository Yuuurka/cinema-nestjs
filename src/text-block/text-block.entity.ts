import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TextBlock {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    uniqueName: string;
    @Column()
    name: string;
    @Column()
    image: string;
    @Column()
    text: string;
    @Column()
    group: string;
}