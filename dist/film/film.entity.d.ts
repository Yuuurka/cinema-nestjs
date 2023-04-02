import { File } from "../file/file.entity";
export declare class Film {
    id: number;
    name: string;
    year: number;
    description: string;
    screenshots: File[];
}
